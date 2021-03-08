const API = {
  // 统计
  getBasicStatistics: `/statistics/basic_info`,
  getLessonStatistics: `/statistics/lessons`,
  getGradeStatistics: `/statistics/grade`,
  getGroupStatistics: `/statistics/group`,
  getHomeworkGroupStatistics: `/statistics/homework_group`,
  getHomeworkStatistics: `/statistics/homework`,
  getstudentStatistics: `/statistics/user_list`,

  // 统计详情
  getLessonStudents: `/statistics/lesson_students`, // 课程维度查看学习情况
  getGradeStudents: `/statistics/grade_students`, // 等级维度查看学习情况
  getGroupStudents: `/statistics/group_students`, // 班级维度查看学习情况
  getHomeworkStudents: `/statistics/homework_students`, // 作业维度查看学习情况

  // 学员
  getStudents: '/students/list', // 学员列表
  getStudentDetail: '/students/detail', // 学员详情

  // 作业
  getHomeworks: '/homeworks/list', // 作业列表
  getHomeworkDetail: '/homeworks/detail', // 作业详情
  correctHomework: '/homeworks/correct', // 作业批改
  reviewHomework: '/homeworks/review', // 作业审核

  // 学分列表
  getScores: '/scores/list', // 学分列表

  toLogin: `/user/login`,                           // 登录
  toLogout: `/user/logout`,                      // 退出
  getUserProfile: `/user/profile`,

};

export default API;