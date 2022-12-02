interface ITree {
  id: number | string
  parent: number | string
  type: string | null
}

interface ITreeStructure {
  getAll(): ITree[]
  getItem(id: number | string): ITree | undefined
  getChildren(id: number | string): ITree[]
  getAllChildren(id: number | string): ITree[]
  getAllParents(id: number | string): ITree[]
}

class TreesStructure implements ITreeStructure {
  private data: ITree[]

  constructor(data: ITree[]) {
    this.data = data
  }

  getAll(): ITree[] {
    return this.data
  }

  getItem(id: number | string): ITree | undefined {
    return this.data.find((item) => item.id === id)
  }

  getChildren(id: number | string): ITree[] {
    return this.data.filter((item) => item.parent === id)
  }

  getAllChildren(id) {
    const children = this.getChildren(id)
    return children.concat(
      children.reduce((acc, item) => {
        const children = this.getAllChildren(item.id)
        return acc.concat(children)
      }, [])
    )
  }

  getAllParents(id) {
    const item = this.getItem(id)
    if (!item) {
      return []
    }
    const parent = this.getItem(item.parent)
    if (!parent) {
      return []
    }
    return [parent].concat(this.getAllParents(parent.id))
  }
}


