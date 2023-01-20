export default {
  name: 'Target',

  methods: {
    activateTarget: {
      chrome: true,
      firefox: true,
    },

    attachToTarget: {
      chrome: true,
      firefox: true,

      parameters: {
        flatten: {
          chrome: true,
          firefox: undefined
        }
      }
    },

    closeTarget: {
      chrome: true,
      firefox: true,
    },

    createTarget: {
      chrome: true,
      firefox: true,

      parameters: {
        url: {
          chrome: true,
          firefox: false,
        },
        width: {
          chrome: true,
          firefox: false,
        },
        height: {
          chrome: true,
          firefox: false,
        },
        browserContextId: {
          chrome: true,
          firefox: true,
        },
        enableBeginFrameControl: {
          chrome: true,
          firefox: false,
        },
        newWindow: {
          chrome: true,
          firefox: false,
        },
        background: {
          chrome: true,
          firefox: false,
        },
        forTab: {
          chrome: true,
          firefox: false,
        },
      },
    },

    detachFromTarget: {
      chrome: true,
      firefox: false,
    },

    getTargets: {
      chrome: true,
      firefox: true,

      parameters: {
        filter: {
          chrome: true,
          firefox: 'D167172',
        }
      },
    },

    setDiscoverTargets: {
      chrome: true,
      firefox: true,

      parameters: {
        filter: {
          chrome: true,
          firefox: 'D167209',
        }
      },
    },

    sendMessageToTarget: {
      chrome: true,
      firefox: true,

      parameters: {
        message: {
          chrome: true,
          firefox: true,
        },
        sessionId: {
          chrome: true,
          firefox: true,
        },
        targetId: {
          chrome: true,
          firefox: false,
        },
      },
    },

    attachToBrowserTarget: {
      chrome: true,
      firefox: false,
    },

    autoAttachRelated: {
      chrome: true,
      firefox: false,
    },

    createBrowserContext: {
      chrome: true,
      firefox: true,

      parameters: {
        disposeOnDetach: {
          chrome: true,
          firefox: false,
        },
        proxyServer: {
          chrome: true,
          firefox: false,
        },
        proxyBypassList: {
          chrome: true,
          firefox: false,
        },
        originsWithUniversalNetworkAccess: {
          chrome: true,
          firefox: false,
        },
      },
    },

    disposeBrowserContext: {
      chrome: true,
      firefox: true,
    },

    exposeDevToolsProtocol: {
      chrome: true,
      firefox: false,
    },

    getBrowserContexts: {
      chrome: true,
      firefox: 'D167293',
    },

    getTargetInfo: {
      chrome: true,
      firefox: false,
    },

    setAutoAttach: {
      chrome: true,
      firefox: false,
    },

    setRemoteLocations: {
      chrome: true,
      firefox: false,
    },
  }
};