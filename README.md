dep-diff [![devDependency Status](https://david-dm.org/alanshaw/dep-diff/dev-status.png)](https://david-dm.org/alanshaw/dep-diff#info=devDependencies)
========

Get a list of differences between package dependencies

```javascript
var depDiff = require("dep-diff")
  , ChangedDep = depDiff.ChangedDep
  , AddedDep = depDiff.AddedDep
  , RemovedDep = depDiff.RemovedDep

var diffs = depDiff(
  {
    "async": "~0.1.2",
    "config": "~0.4.32",
    "consolidate": "~0.9.1"
  },
  {
    "async": "~0.2.9",
    "config": "~0.4.32",
    "couchwatch": "~0.6.0"
  }
)

// diffs is an array of 3 items [ChangedDep, AddedDep, RemovedDep]. You use instanceof to determine the diff type.
//
// ChangedDep.name = async
// ChangedDep.version = ~0.2.9
// ChangedDep.previous = ~0.1.2
//
// AddedDep.name = couchwatch
// AddedDep.version = ~0.6.0
//
// RemovedDep.name = consolidate
// RemovedDep.previous = ~0.9.1
```
