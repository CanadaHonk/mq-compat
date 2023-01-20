export default {
  name: 'HTTP',

  methods: {
    '/json/version': {
      chrome: true,
      firefox: true,

      parameters: {
        'Browser': {
          chrome: true,
          firefox: true
        },

        'Protocol-Version': {
          chrome: true,
          firefox: true
        },

        'User-Agent': {
          chrome: true,
          firefox: true
        },

        'webSocketDebuggerUrl': {
          chrome: true,
          firefox: true
        },

        'V8-Version': {
          chrome: true,
          firefox: '<span>Stub</span>'
        },

        'WebKit-Version': {
          chrome: true,
          firefox: '<span>Stub</span>'
        }
      },
    },

    '/json/list': {
      chrome: true,
      firefox: true,

      parameters: {
        id: {
          chrome: true,
          firefox: true
        },

        title: {
          chrome: true,
          firefox: true
        },

        type: {
          chrome: true,
          firefox: true
        },

        url: {
          chrome: true,
          firefox: true
        },

        webSocketDebuggerUrl: {
          chrome: true,
          firefox: true
        },

        description: {
          chrome: true,
          firefox: true
        },

        faviconUrl: {
          chrome: true,
          firefox: false
        },

        devtoolsFrontendUrl: {
          chrome: true,
          firefox: false
        },

        'Visual sorting': {
          chrome: true,
          firefox: '1738397'
        },

        'Main process not included': {
          chrome: true,
          firefox: '111 (nightly)'
        },
      },
    },

    '/json<br><small>(/json/list alias)</small>': {
      chrome: true,
      firefox: '111 (nightly)'
    },

    '/json/protocol': {
      chrome: true,
      firefox: true,
    },

    '/json/new': {
      chrome: true,
      firefox: 'D166884',

      parameters: {
        url: {
          chrome: true,
          firefox: 'D166884'
        }
      }
    },

    '/json/activate': {
      chrome: true,
      firefox: 'D166884'
    },

    '/json/close': {
      chrome: true,
      firefox: 'D166884'
    },

    '/devtools/inspector.html': {
      chrome: true,
      firefox: false
    }
  }
};