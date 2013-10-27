var test = require("tap").test
  , depDiff = require("./")
  , ChangedDep = depDiff.ChangedDep
  , AddedDep = depDiff.AddedDep
  , RemovedDep = depDiff.RemovedDep

test("Addition", function (t) {
  var diffs = depDiff({}, {foo: "~1.0.1", bar: "latest"})

  t.equal(diffs.length, 2)
  t.ok(diffs[0] instanceof AddedDep)
  t.equal(diffs[0].version, "~1.0.1")
  t.ok(diffs[1] instanceof AddedDep)
  t.equal(diffs[1].version, "latest")
  t.end()
})

test("Removal", function (t) {
  var diffs = depDiff({foo: "~1.0.1", bar: "latest"}, {})

  t.equal(diffs.length, 2)
  t.ok(diffs[0] instanceof RemovedDep)
  t.equal(diffs[0].previous, "~1.0.1")
  t.ok(diffs[1] instanceof RemovedDep)
  t.equal(diffs[1].previous, "latest")
  t.end()
})

test("Change", function (t) {
  var diffs = depDiff({foo: "~1.0.1", bar: "1.2.x"}, {foo: "~2.1.1", bar: "1.3.x"})

  t.equal(diffs.length, 2)
  t.ok(diffs[0] instanceof ChangedDep)
  t.equal(diffs[0].version, "~2.1.1")
  t.equal(diffs[0].previous, "~1.0.1")
  t.ok(diffs[1] instanceof ChangedDep)
  t.equal(diffs[1].version, "1.3.x")
  t.equal(diffs[1].previous, "1.2.x")
  t.end()
})

test("Dependency version change to empty string is not a removal", function (t) {
  var diffs = depDiff({foo: "~1.0.1", bar: "latest"}, {foo: "", bar: "latest"})

  t.equal(diffs.length, 1)
  t.ok(diffs[0] instanceof ChangedDep)
  t.equal(diffs[0].version, "")
  t.equal(diffs[0].previous, "~1.0.1")
  t.end()
})