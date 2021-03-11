
const tokens = {
  teacher: {
    token: 'teacher-token'
  },
  admin: {
    token: 'admin-token'
  },
  assistant: {
    token: 'assistant-token'
  },
  reviewer: {
    token: 'reviewer-token'
  },
  student: {
    token: 'student-token'
  }
};

const users = {
  'teacher-token': {
    roles: ['teacher'],
    name: 'Teacher',
    rolePermissions: {
      permissions: [
        { permissionId: '20000011', describe: '概况' },
        { permissionId: '20000201', describe: '学员管理' },
        { permissionId: '20000100', describe: '统计管理' },
        { permissionId: '20000101', describe: '课程维度' },
        { permissionId: '20000102', describe: '等级维度' },
        { permissionId: '20000104', describe: '作业维度' },
        { permissionId: '20000105', describe: '学员排名' },
      ]
    },
  },
  'admin-token': {
    roles: ['admin'],
    name: 'Admin',
    rolePermissions: {
      permissions: [
        { permissionId: '20000011', describe: '概况' },
        { permissionId: '20000201', describe: '学员管理' },
        { permissionId: '20000100', describe: '统计管理' },
        { permissionId: '20000101', describe: '课程维度' },
        { permissionId: '20000102', describe: '等级维度' },
        { permissionId: '20000103', describe: '班级维度' },
        { permissionId: '20000104', describe: '作业维度' },
        { permissionId: '20000105', describe: '学员排名' },
      ]
    },
  },
  'assistant-token': {
    roles: ['assistant'],
    name: 'Assistant',
    rolePermissions: {
      permissions: [
        { permissionId: '20000011', describe: '概况' },
        { permissionId: '20000301', describe: '作业管理' },
        { permissionId: '20000100', describe: '统计管理' },
        { permissionId: '20000104', describe: '作业维度' },
      ]
    },
  },
  'reviewer-token': {
    roles: ['reviewer'],
    name: 'Reviewer',
    rolePermissions: {
      permissions: [{ permissionId: '20000011', describe: '概况' }, { permissionId: '20000401', describe: '审核管理' },]
    },
  },
  'student-token': {
    roles: ['student'],
    name: 'Student',
    rolePermissions: {
      permissions: [
        { permissionId: '20000011', describe: '概况' },
        { permissionId: '20002001', describe: '第一章' },
        { permissionId: '20002002', describe: '第一节课' },
        { permissionId: '20002003', describe: '第一次作业' },
        { permissionId: '20003001', describe: '第二章' },
        { permissionId: '20003002', describe: '第二节课' },
        { permissionId: '20003003', describe: '第二次作业' },
        { permissionId: '20004001', describe: '第三章' },
        { permissionId: '20004002', describe: '第三节课' },
        { permissionId: '20004003', describe: '第三次作业' },
        { permissionId: '20005001', describe: '第四章' },
        { permissionId: '20005002', describe: '第四节课' },
        { permissionId: '20005003', describe: '第四次作业' },
        { permissionId: '20006001', describe: '第五章' },
        { permissionId: '20007001', describe: '第六章' },
        { permissionId: '20008001', describe: '第七章' },
        { permissionId: '20009001', describe: '第八章' },
        { permissionId: '20010001', describe: '第九章' },
        { permissionId: '20011001', describe: '第十章' },
        { permissionId: '20012001', describe: '第十一章' },
        { permissionId: '20013001', describe: '第十二章' },
      ]
    },
    score: '@integer(0, 300)',
    progress: '@integer(0, 100)',
    ranking: '@integer(1, 600)',
    finished_count: '@integer(1, 5)',
    doing: '@integer(1,4)',
    pending: '@integer(1,2)',
  }
};

module.exports = [
  // user login
  {
    url: 'user/login',
    type: 'post',
    response: config => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        };
      }

      return {
        code: 0,
        data: token
      };
    }
  },

  // get user info
  {
    url: 'user/profile',
    type: 'get',
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        };
      }

      return {
        code: 0,
        data: info
      };
    }
  },

  // user logout
  {
    url: 'logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      };
    }
  }
];
