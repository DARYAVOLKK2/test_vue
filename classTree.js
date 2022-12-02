class TreeStore {}

const items = [
  {id: 1, parent: 'root'},
  {id: 2, parent: 1, type: 'test'},
  {id: 3, parent: 1, type: 'test'},

  {id: 4, parent: 2, type: 'test'},
  {id: 5, parent: 2, type: 'test'},
  {id: 6, parent: 2, type: 'test'},

  {id: 7, parent: 4, type: null},
  {id: 8, parent: 4, type: null},
]
const js = new TreeStore(items)

const TreeStructure = (() => {
  function TreeStructure(data) {
    this.data = data
  }
  TreeStructure.prototype.getAll = () => {
    return this.data
  }
  TreeStructure.prototype.getItem = (id) => {
    return this.data.find(function (item) {
      return item.id === id
    })
  }
  TreeStructure.prototype.getChildren = (id) => {
    return this.data.filter(function (item) {
      return item.parent === id
    })
  }
  TreeStructure.prototype.getAllChildren = (id) => {
    let _this = this
    let children = this.getChildren(id)
    return children.concat(
      children.reduce(function (acc, item) {
        let children = _this.getAllChildren(item.id)
        return acc.concat(children)
      }, [])
    )
  }
  TreeStructure.prototype.getAllParents = (id) => {
    let item = this.getItem(id)
    if (!item) {
      return []
    }
    let parent = this.getItem(item.parent)
    if (!parent) {
      return []
    }
    return [parent].concat(this.getAllParents(parent.id))
  }
  return TreeStructure
})()
console.log(TreeStructure)


