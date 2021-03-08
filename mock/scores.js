const Mock = require('mockjs')

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    student_id: '@integer(1, 10)',
    category: function() {
      if ((i+1) % 2 === 0) { return '作业' } else { return '上课'}
    },
    title: function() {
      if ((i+1) % 4 === 0) {
        return `第${i+1}次作业-优秀`
      } else if ((i+1) % 2 === 0) {
        return `第${i+1}次作业`
      } else {
        return `第${i+1}次课`
      }
    },
    created_at: '@date',
    score: function() {
      if ((i+1) % 4 === 0) {
        return 5
      } else if ((i+1) % 2 === 0) {
        return 10
      } else {
        return 2
      }
    }
  }))
}

module.exports = [
  {
    url: 'scores/list',
    type: 'get',
    response: _ => {

      return {
        code: 0,
        data: {
          total_score: 150,
          deadline: '2021-04-15',
          list: List
        }
      }
    }
  },
]

