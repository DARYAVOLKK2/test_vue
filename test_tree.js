const TreeStructure = require('../TreeStructure')

const data = [
  {id: 1, parent: 'root', type: null},
  {id: 2, parent: 1, type: 'test'},
  {id: 3, parent: 1, type: 'test'},
  {id: 4, parent: 2, type: 'test'},
  {id: 5, parent: 2, type: 'test'},
  {id: 6, parent: 2, type: 'test'},
  {id: 7, parent: 4, type: null},
  {id: 8, parent: 4, type: null},
]

const ts = new TreeStructure(data)

describe('TreeStructure', () => {
  it('should return all data', () => {
    expect(ts.getAll()).toEqual(data)
  })

  it('should return item with id 7', () => {
    expect(ts.getItem(7)).toEqual(data[6])
  })

  it('should return children of item with id 4', () => {
    expect(ts.getChildren(4)).toEqual([data[6], data[7]])
  })

  it('should return children of item with id 5', () => {
    expect(ts.getChildren(5)).toEqual([])
  })

  it('should return children of item with id 2', () => {
    expect(ts.getChildren(2)).toEqual([data[3], data[4], data[5]])
  })

  it('should return all children of item with id 2', () => {
    expect(ts.getAllChildren(2)).toEqual([
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
    ])
  })

  it('should return all parents of item with id 7', () => {
    expect(ts.getAllParents(7)).toEqual([data[3], data[1], data[0]])
  })
})
