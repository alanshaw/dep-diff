function Diff (name, version, previous) {
  this.name = name
  this.version = version
  this.previous = previous
}

function ChangedDep (name, version, previous) {
  Diff.call(this, name, version, previous)
}

function RemovedDep (name, previous) {
  Diff.call(this, name, null, previous)
}

function AddedDep (name, version) {
  Diff.call(this, name, version, null)
}

function diff (deps1, deps2) {
  deps1 = deps1 || {}
  deps2 = deps2 || {}

  var diffs = []

  // Check for removals and changes
  Object.keys(deps1).forEach(function(key) {
    if (deps2[key] === undefined) {
      // Dep has been removed
      diffs.push(new RemovedDep(key, deps1[key]))
    } else if (deps1[key] !== deps2[key]) {
      // Dep has been changed
      diffs.push(new ChangedDep(key, deps2[key], deps1[key]))
    }
  })

  // Check for additions
  Object.keys(deps2).forEach(function(key) {
    if (deps1[key] === undefined) {
      diffs.push(new AddedDep(key, deps2[key]))
    }
  })

  return diffs
}

diff.ChangedDep = ChangedDep
diff.RemovedDep = RemovedDep
diff.AddedDep = AddedDep

module.exports = diff