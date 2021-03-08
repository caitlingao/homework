const Mock = require('mockjs')

const List = []
const count = 600

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    no: 'GK@integer(10000000, 99000000)',
    class_id: '@integer(1, 6)',
    class_name: function() { return `${this.class_id}班` },
    score: '@integer(0, 100)',
    ranking: '@integer(1, 600)',
    progress: '@integer(0, 100)',
    attended_rate: '@float(0, 90, 2, 2)',
    finished_rate: '@float(0, 90, 2, 2)',
    homework_finished_rate: '@float(0, 90, 2, 2)',
    homework_unfinished_rate: '@float(0, 90, 2, 2)',
    homework_excellent_rate: '@float(0, 90, 2, 2)',
    lessons: [{'第1节课': '@integer(1, 3)', '第2节课': '@integer(1, 3)', '第3节课': '@integer(1, 3)', '第4节课': '@integer(1, 3)', '第5节课': '@integer(1, 3)', '第6节课': '@integer(1, 3)', '第7节课': '@integer(1, 3)', '第8节课': '@integer(1, 3)', '第9节课': '@integer(1, 3)', '第10节课': '@integer(1, 3)', '第11节课': '@integer(1, 3)', '第12节课': '@integer(1, 3)', '第13节课': '@integer(1, 3)', '第14节课': '@integer(1, 3)', '第15节课': '@integer(1, 3)', '第16节课': '@integer(1, 3)', '第17节课': '@integer(1, 3)', '第18节课': '@integer(1, 3)', '第19节课': '@integer(1, 3)', '第20节课': '@integer(1, 3)', '第21节课': '@integer(1, 3)', '第22节课': '@integer(1, 3)', '第23节课': '@integer(1, 3)', '第24节课': '@integer(1, 3)', '第25节课': '@integer(1, 3)', }],
    homeworks: [
        {id: 1, name: '第1次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 2, name: '第2次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 3, name: '第3次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 4, name: '第4次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 5, name: '第5次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 6, name: '第6次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 7, name: '第7次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 8, name: '第8次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 9, name: '第9次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
        {id: 10, name: '第10次作业', status: '@integer(1, 2)', correct: function() { if (this.status === 2) return '@integer(1, 2)'}, is_excellent: function() { if (this.status === 2) return '@integer(0, 1)' } },
    ]
  }))
}

module.exports = [
  {
    url: 'students/list',
    type: 'get',
    response: config => {
      const { class_id, no, name, page = 1, limit = 20 } = config.query

      let mockList = List.filter(item => {
        if (class_id && item.class_id !== Number(class_id)) return false
        if (no && item.no !== no) return false
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 0,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },

  {
    url: 'students/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const student of List) {
        if (student.id === +id) {
          return {
            code: 0,
            data: student
          }
        }
      }
        return {
        code: 0,
        data: List[0]
        }
    }
  },
]

