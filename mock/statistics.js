const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    reviewer: '@cname',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

const lessonsList = []
for (let i = 0; i < 25; i++) {
  lessonsList.push(Mock.mock({
    lesson: `第${i+1}节课`,
    attended_rate: '@float(90, 100, 2, 2)',
    finished_rate: '@float(80, 90, 2, 2)',
  }))
}

const basicStatic = {
  'teacher-token': Mock.mock({
    student_count: '@integer(80, 100)',
    attended_rate: '@float(90, 100, 2, 2)',
    finished_rate: '@float(80, 90, 2, 2)',
    homework_finished_rate: '@float(90, 100, 2, 2)',
    homework_excellent_rate: '@float(80, 90, 2, 2)',
  }),
  'admin-token': Mock.mock({
    student_count: '@integer(500, 600)',
    attended_rate: '@float(90, 100, 2, 2)',
    finished_rate: '@float(80, 90, 2, 2)',
    homework_finished_rate: '@float(90, 100, 2, 2)',
    homework_excellent_rate: '@float(80, 90, 2, 2)',
  }),
  'assistant-token': Mock.mock({
    finished_count: '@integer(500, 600)',
    unfinished_count: '@integer(500, 600)',
  }),
  'reviewer-token': Mock.mock({
    finished_count: '@integer(500, 600)',
    unfinished_count: '@integer(500, 600)',
  }),
}

const gradeList = []
const gradeNameObj = {0: 'A级', 1: 'B级', 2: 'C级', 3: 'D级'}
for (let i = 0; i < 4; i++) {
  gradeList.push(Mock.mock({
    grade: gradeNameObj[i],
    attended_rate: '@float(90, 100, 2, 2)',
    finished_rate: '@float(80, 90, 2, 2)',
  }))
}

const groupList = []
for (let i = 0; i < 6; i++) {
  groupList.push(Mock.mock({
    group: `${i+1}班`,
    attended_rate: '@float(90, 100, 2, 2)',
    finished_rate: '@float(80, 90, 2, 2)',
  }))
}

const homeworkList = []
for (let i = 0; i < 10; i++) {
  homeworkList.push(Mock.mock({
    homework: `第${i+1}次作业`,
    finished_rate: '@float(80, 100, 2, 2)',
    unfinished_rate: '@float(0, 20, 2, 2)',
    excellent_rate: '@float(0, 60, 2, 2)',
  }))
}

const homeworkGroupList = []
for (let i = 0; i < 6; i++) {
  homeworkGroupList.push(Mock.mock({
    group: `${i+1}班`,
    finished_rate: '@float(80, 100, 2, 2)',
    unfinished_rate: '@float(0, 20, 2, 2)',
    excellent_rate: '@float(0, 60, 2, 2)',
  }))
}

const userList = []
for (let i = 0; i < 600; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    no: 'GK@integer(10000000, 99000000)',
    finished_rate: '@float(80, 90, 2, 2)',
    homework_finished_rate: '@float(90, 100, 2, 2)',
    homework_excellent_rate: '@float(0, 60, 2, 2)',
  }))
}

const lessonUserList = []
for (let i = 0; i < 25*100; i++) {
  lessonUserList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    no: 'GK@integer(10000000, 99000000)',
    // class_name: `${(i) % 6 + 1}班`,
    class_name: `@integer(1, 6)班`,
    lesson_status: '@integer(1, 3)',
    lesson_id: '@integer(1, 25)',
  }))
}

const allUserList = []
for (let i = 0; i < 600; i++) {
  allUserList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    no: 'GK@integer(10000000, 99000000)',
    class_id: '@integer(1, 6)',
    class_name: function() { return `${this.class_id}班` },
    attended_rate: '@float(0, 90, 2, 2)',
    finished_rate: '@float(0, 90, 2, 2)',
    homework_finished_rate: '@float(0, 90, 2, 2)',
    homework_unfinished_rate: '@float(0, 90, 2, 2)',
    homework_excellent_rate: '@float(0, 90, 2, 2)',
  }))
}

const homeworkUserList = []
for (let i = 0; i < 25*100; i++) {
  homeworkUserList.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    no: 'GK@integer(10000000, 99000000)',
    class_name: `@integer(1, 6)班`,
    homework_status: '@integer(1, 2)',
    homework_id: '@integer(1, 25)',
    is_excellent: function() { 
      if (this.homework_status === 1) {
        return '@integer(0, 1)'
      }
    }
  }))
}

module.exports = [
  {
    url: 'statistics/basic_info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const data = basicStatic[token]

      return {
        code: 0,
        data
      }
    }
  },
  {
    url: 'statistics/lesson_students',
    type: 'get',
    response: config => {
      const { lesson_id, lesson_status, page = 1, limit = 20 } = config.query
      let mockList = lessonUserList.filter(item => {
        if (lesson_id && item.lesson_id !== Number(lesson_id)) return false
        if (lesson_status && item.lesson_status !== Number(lesson_status)) return false
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
    url: 'statistics/grade_students',
    type: 'get',
    response: config => {
      const { grade, category, page = 1, limit = 20 } = config.query
      let mockList = [];
    if (grade === 'A') {
        if (Number(category) === 1) {
          mockList = allUserList.filter(item => item.finished_rate >= 85);
        } else {
          mockList = allUserList.filter(item => item.attended_rate >= 85);
        }
      } else if (grade === 'B') {
        if (Number(category) === 1) {
          mockList = allUserList.filter(item => item.finished_rate >= 60 && item.finished_rate < 85);
        } else {
          mockList = allUserList.filter(item => item.attended_rate >= 60 && item.attended_rate < 85);
        }
      } else if (grade === 'C') {
        if (Number(category) === 1) {
          mockList = allUserList.filter(item => item.finished_rate >= 45 && item.finished_rate < 60);
        } else {
          mockList = allUserList.filter(item => item.attended_rate >= 45 && item.attended_rate < 60);
        }
      } else {
        if (Number(category) === 1) {
          mockList = allUserList.filter(item => item.finished_rate < 45);
        } else {
          mockList = allUserList.filter(item => item.attended_rate < 45);
        }
      }

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
    url: 'statistics/group_students',
    type: 'get',
    response: config => {
      const { class_id, page = 1, limit = 20 } = config.query

      const mockList = allUserList.filter(item => {
        if (class_id && item.class_id !== Number(class_id)) return false
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
    url: 'statistics/homework_students',
    type: 'get',
    response: config => {
      const { homework_id, homework_status, is_excellent, page = 1, limit = 20 } = config.query
      let mockList = homeworkUserList.filter(item => {
        if (homework_id && item.homework_id !== Number(homework_id)) return false
        if (homework_status && item.homework_status !== Number(homework_status)) return false
        if (is_excellent && item.is_excellent !== Number(is_excellent)) return false
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
    url: 'statistics/lessons',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: lessonsList
      }
    }
  },
  {
    url: 'statistics/grade',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: gradeList
      }
    }
  },
  {
    url: 'statistics/group',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: groupList
      }
    }
  },
  {
    url: 'statistics/homework_group',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: homeworkGroupList
      }
    }
  },
  {
    url: 'statistics/homework',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: homeworkList
      }
    }
  },
  {
    url: 'statistics/user_list',
    type: 'get',
    response: config => {
      const { category, sort } = config.query
      let mockList = [];
     if (category === '0') {
        mockList = userList.sort((u1, u2) => { return u2.finished_rate - u1.finished_rate });
      } else if (category === '1') {
        mockList = userList.sort((u1, u2) => { return u2.homework_finished_rate - u1.homework_finished_rate });
      } else if (category === '2') {
        mockList = userList.sort((u1, u2) => { return u2.homework_excellent_rate - u1.homework_excellent_rate });
      }

      mockList = mockList.slice(0, 50)
      return {
        code: 0,
        data: mockList
      }
    }
  },
]

