/**
 * sakura配置覆写脚本
 */

// --- 静态配置区域 ---

/**
 * 分流策略组启用配置，若不需要某个策略组，请设为 false
 * true = 启用
 * false = 禁用
 */
 const ruleOptionsEnable = {
    Telegram: true, // Telegram通讯软件
    AI: true, // 国外AI服务
    Steam: true, // Steam游戏平台
    Media: true, // 国外视频平台
    FCM: false, // GoogleFCM服务
    Google: true, // Google服务
    Microsoft: true, // Microsoft服务
    Apple: true, // Apple服务
    Spotify: true, // Spotify音乐服务
    Emby: true, // Emby媒体服务
    TikTok: false, // TikTok视频平台
    Twitter: false, // Twitter社交平台
    PikPak: false, // PikPak网盘服务
    AdBlock: true, // 广告拦截
  };
  
  // 定义全局排除节点的正则表达式，用于排除非地区的信息节点
  const excludeFilter =
    /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|⚠️|@|Expire|http|com/u;
  
  // 预定义 rules
  const rules = [
    // 禁用国外 QUIC 流量
    'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn_additional),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
  
    // 私有网络直连
    'RULE-SET,private,DIRECT',
    'RULE-SET,private_ip,DIRECT,no-resolve',
  
    // 国内直连
    'RULE-SET,games_cn,DIRECT', // 已包含 steam 下载域名
    'RULE-SET,epicgames,DIRECT',
    'RULE-SET,nvidia_cn,DIRECT',
    'RULE-SET,apple_cn,DIRECT',
    'RULE-SET,microsoft_cn,DIRECT',
    'DOMAIN,fsend.cn,DIRECT',
    'DOMAIN,international-gfe.download.nvidia.com,DIRECT',
  ];
  
  // 定义地区策略组
  const regionDefinitions = [
    {
      name: 'HK',
      regex: /🇭🇰|港|HK|[Hh]ong\s*[Kk]ong/,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png',
    },
    {
      name: 'JP',
      regex: /🇯🇵|日本|JP|[Jj]apan/,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png',
    },
    {
      name: 'US',
      regex: /🇺🇸|美|US|[Aa]merica|[Uu]nited\s*[Ss]tates/,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png',
    },
    {
      name: 'SG',
      regex: /🇸🇬|新加坡|狮城|SG|[Ss]ingapore/,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png',
    },
    {
      name: 'TW',
      regex: /🇹🇼|台湾|TW|[Tt]aiwan/,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png',
    },
  ];
  
  // Rule Providers 通用配置
  const ruleProviderCommonDomain = {
    type: 'http',
    format: 'mrs',
    interval: 86400,
    behavior: 'domain',
  };
  const ruleProviderCommonIpcidr = {
    type: 'http',
    format: 'mrs',
    interval: 86400,
    behavior: 'ipcidr',
  };
  
  // 定义基础 Rule Providers
  const baseRuleProviders = {
    // --- 直连规则集 ---
  
    private: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs',
      path: './ruleset/private.mrs',
      'path-in-bundle': 'geo/geosite/private.mrs',
    },
    private_ip: {
      ...ruleProviderCommonIpcidr,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/private.mrs',
      path: './ruleset/private_ip.mrs',
      'path-in-bundle': 'geo/geoip/private.mrs',
    },
    games_cn: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-games@cn.mrs',
      path: './ruleset/category-games@cn.mrs',
      'path-in-bundle': 'geo/geosite/category-games@cn.mrs',
    },
    epicgames: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/epicgames.mrs',
      path: './ruleset/epicgames.mrs',
      'path-in-bundle': 'geo/geosite/epicgames.mrs',
    },
    nvidia_cn: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/nvidia@cn.mrs',
      path: './ruleset/nvidia@cn.mrs',
      'path-in-bundle': 'geo/geosite/nvidia@cn.mrs',
    },
    apple_cn: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/apple@cn.mrs',
      path: './ruleset/apple@cn.mrs',
      'path-in-bundle': 'geo/geosite/apple@cn.mrs',
    },
    microsoft_cn: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft@cn.mrs',
      path: './ruleset/microsoft@cn.mrs',
      'path-in-bundle': 'geo/geosite/microsoft@cn.mrs',
    },
    cn_additional: {
      ...ruleProviderCommonDomain,
      url: 'https://static-file-global.353355.xyz/rules/cn-additional-list.mrs',
      path: './ruleset/cn-additional-list.mrs',
      'path-in-bundle': 'geo/geosite/cn.mrs',
    },
    cn_ip: {
      ...ruleProviderCommonIpcidr,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs',
      path: './ruleset/cn_ip.mrs',
      'path-in-bundle': 'geo/geoip/cn.mrs',
    },
  
    // --- 代理规则集 ---
  
    github: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs',
      path: './ruleset/github.mrs',
      'path-in-bundle': 'geo/geosite/github.mrs',
    },
    gfw: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/gfw.mrs',
      path: './ruleset/gfw.mrs',
      'path-in-bundle': 'geo/geosite/gfw.mrs',
    },
  
    // --- 其他规则集 ---
  
    fakeip_filter: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/wwqgtxx/clash-rules@release/fakeip-filter.mrs',
      path: './ruleset/fakeip-filter.mrs',
      'path-in-bundle': 'geo/geosite/private.mrs',
    },
    cn: {
      ...ruleProviderCommonDomain,
      url: 'https://fastly.jsdelivr.net/gh/wwqgtxx/clash-rules@release/direct.mrs',
      path: './ruleset/cn.mrs',
      'path-in-bundle': 'geo/geosite/cn.mrs',
    },
  };
  
  // 策略组公共配置
  const groupBaseOption = {
    interval: 60,
    timeout: 1000,
    url: 'https://www.gstatic.com/generate_204',
    lazy: true,
    // 'max-failed-times': 3,
    'empty-fallback': 'REJECT',
  };
  
  // reject策略组通用配置
  const rejectBaseOption = {
    ...groupBaseOption,
    type: 'select',
    hidden: true,
  };

  // select策略组通用配置
  const selectBaseOption = {
    ...groupBaseOption,
    type: 'select',
    hidden: false,
  };
  
  // url-test策略组通用配置
  const urlTestBaseOption = {
    ...groupBaseOption,
    type: 'url-test',
    tolerance: 10,
    'exclude-type': 'DIRECT',
    icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png',
    hidden: true,
  };
  
  // load-balance策略组通用配置
  const loadBalanceBaseOption = {
    ...groupBaseOption,
    type: 'load-balance',
    strategy: 'sticky-sessions',
    'exclude-type': 'DIRECT',
    icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Round_Robin.png',
    hidden: true,
  };
  
  // 定义分流策略组配置
  const serviceConfigs = [
    {
      name: 'Telegram',
      defaultSelected: 'Auto',
      providers: {
          telegram: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs',
          path: './ruleset/telegram.mrs',
          'path-in-bundle': 'geo/geosite/telegram.mrs',
          },
          telegram_ip: {
          ...ruleProviderCommonIpcidr,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs',
          path: './ruleset/telegram_ip.mrs',
          'path-in-bundle': 'geo/geoip/telegram.mrs',
          },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png',
      rules: ['RULE-SET,telegram,Telegram', 'RULE-SET,telegram_ip,Telegram,no-resolve'],
    },
    {
      name: 'AI',
      defaultSelected: 'US',
      providers: {
        ai: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ai-!cn.mrs',
          path: './ruleset/ai.mrs',
          'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png',
      rules: ['RULE-SET,ai,AI'],
    },
    {
      name: 'Steam',
      direct: true,
      providers: {
          steam: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/steam.mrs',
          path: './ruleset/steam.mrs',
          'path-in-bundle': 'geo/geosite/steam.mrs',
          },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Steam.png',
      rules: ['RULE-SET,steam,Steam'],
    },
    {
      name: 'Media',
      defaultSelected: 'JP',
      providers: {
        youtube: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs',
          path: './ruleset/youtube.mrs',
          'path-in-bundle': 'geo/geosite/youtube.mrs',
        },
        instagram: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/instagram.mrs',
          path: './ruleset/instagram.mrs',
          'path-in-bundle': 'geo/geosite/instagram.mrs',
        },
        netflix: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/netflix.mrs',
          path: './ruleset/netflix.mrs',
          'path-in-bundle': 'geo/geosite/netflix.mrs',
        },
        netflix_ip: {
          ...ruleProviderCommonIpcidr,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/netflix.mrs',
          path: './ruleset/netflix_ip.mrs',
          'path-in-bundle': 'geo/geoip/netflix.mrs',
        },
        hbo: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/hbo.mrs',
          path: './ruleset/hbo.mrs',
          'path-in-bundle': 'geo/geosite/hbo.mrs',
        },
        twitch: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/twitch.mrs',
          path: './ruleset/twitch.mrs',
          'path-in-bundle': 'geo/geosite/twitch.mrs',
        },
        disney: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/disney.mrs',
          path: './ruleset/disney.mrs',
          'path-in-bundle': 'geo/geosite/disney.mrs',
        },
        niconico: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/niconico.mrs',
          path: './ruleset/niconico.mrs',
          'path-in-bundle': 'geo/geosite/niconico.mrs',
        },
        bbc: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/bbc.mrs',
          path: './ruleset/bbc.mrs',
          'path-in-bundle': 'geo/geosite/bbc.mrs',
        },
        pornhub: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/pornhub.mrs',
          path: './ruleset/pornhub.mrs',
          'path-in-bundle': 'geo/geosite/pornhub.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ForeignMedia.png',
      rules: [
        'RULE-SET,youtube,Media',
        'RULE-SET,instagram,Media',
        'RULE-SET,netflix,Media',
        'RULE-SET,netflix_ip,Media,no-resolve',
        'RULE-SET,hbo,Media',
        'RULE-SET,twitch,Media',
        'RULE-SET,disney,Media',
        'RULE-SET,niconico,Media',
        'RULE-SET,bbc,Media',
        'RULE-SET,pornhub,Media',
      ],
    },
    {
      name: 'FCM',
      direct: true,
      defaultSelected: 'DIRECT',
      providers: {
        googlefcm: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/googlefcm.mrs',
          path: './ruleset/googlefcm.mrs',
          'path-in-bundle': 'geo/geosite/googlefcm.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/MiToverG422/Qure@master/IconSet/Color/fcm.png',
      rules: ['RULE-SET,googlefcm,FCM'],
    },
    {
      name: 'Google',
      providers: {
        google: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs',
          path: './ruleset/google.mrs',
          'path-in-bundle': 'geo/geosite/google.mrs',
        },
        google_ip: {
          ...ruleProviderCommonIpcidr,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs',
          path: './ruleset/google_ip.mrs',
          'path-in-bundle': 'geo/geoip/google.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png',
      rules: ['RULE-SET,google,Google', 'RULE-SET,google_ip,Google,no-resolve'],
    },
    {
      name: 'Microsoft',
      direct: true,
      defaultSelected: 'DIRECT',
      providers: {
        microsoft: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft.mrs',
          path: './ruleset/microsoft.mrs',
          'path-in-bundle': 'geo/geosite/microsoft.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png',
      rules: ['RULE-SET,microsoft,Microsoft'],
    },
    {
      name: 'Apple',
      direct: true,
      defaultSelected: 'DIRECT',
      providers: {
        apple: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/apple.mrs',
          path: './ruleset/apple.mrs',
          'path-in-bundle': 'geo/geosite/apple.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png',
      rules: ['RULE-SET,apple,Apple'],
    },
    {
      name: 'Spotify',
      direct: true,
      defaultSelected: 'DIRECT',
      providers: {
        spotify: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/spotify.mrs',
          path: './ruleset/spotify.mrs',
          'path-in-bundle': 'geo/geosite/spotify.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png',
      rules: ['RULE-SET,spotify,Spotify'],
    },
    {
      name: 'Emby',
      direct: true,
      providers: {
        emby: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/666OS/rules@release/mihomo/domain/Emby.mrs',
          path: './ruleset/emby.mrs',
          'path-in-bundle': 'geo/geosite/category-emby.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Emby.png',
      rules: ['RULE-SET,emby,Emby', 'DOMAIN-SUFFIX,mb3admin.com,Emby', 'DOMAIN-KEYWORD,emby,Emby'],
    },
    {
      name: 'TikTok',
      defaultSelected: '日本',
      providers: {
        tiktok: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/tiktok.mrs',
          path: './ruleset/tiktok.mrs',
          'path-in-bundle': 'geo/geosite/tiktok.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png',
      rules: ['RULE-SET,tiktok,TikTok'],
    },
    {
      name: 'Twitter',
      providers: {
        twitter: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/twitter.mrs',
          path: './ruleset/twitter.mrs',
          'path-in-bundle': 'geo/geosite/twitter.mrs',
        },
        twitter_ip: {
          ...ruleProviderCommonIpcidr,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/twitter.mrs',
          path: './ruleset/twitter_ip.mrs',
          'path-in-bundle': 'geo/geoip/twitter.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png',
      rules: ['RULE-SET,twitter,Twitter', 'RULE-SET,twitter_ip,Twitter,no-resolve'],
    },
    {
      name: 'PikPak',
      direct: true,
      providers: {
        pikpak: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/pikpak.mrs',
          path: './ruleset/pikpak.mrs',
          'path-in-bundle': 'geo/geosite/pikpak.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/lige47/QuanX-icon-rule@main/icon/03CNSoft/pikpak.png',
      rules: ['RULE-SET,pikpak,PikPak'],
    },
    {
      name: 'AdBlock',
      reject: true,
      defaultSelected: 'REJECT',
      providers: {
        adblockmihomolite: {
          ...ruleProviderCommonDomain,
          url: 'https://fastly.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.mrs',
          path: './ruleset/adblockmihomolite.mrs',
          'path-in-bundle': 'geo/geosite/category-ads-all.mrs',
        },
      },
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Advertising.png',
      rules: ['RULE-SET,adblockmihomolite,AdBlock'],
    },
  ];
  
  // 定义创建地区策略组的函数
  function createRegionGroup(name, icon, proxies) {
    const urlTestName = `${name}-Auto`;
    return [
      {
        ...urlTestBaseOption,
        name: urlTestName,
        proxies,
      },
      {
        ...selectBaseOption,
        name,
        icon,
        proxies: [urlTestName, ...proxies],
      },
    ];
  }
  
  // --- 主入口 ---
  
  function main(config) {
    const newConfig = {};
  
    // 过滤节点列表
    const filteredProxies = (config.proxies || []).filter((proxy) => {
      const type = String(proxy.type ?? '').toLowerCase();
      return (
        type !== 'direct' && type !== 'reject' && !excludeFilter.test(proxy.name)
      );
    });
  
    // 验证节点列表是否存在代理节点
    if (!filteredProxies.length) {
      throw new Error('配置文件中未找到任何代理节点，请使用机场提供的配置文件进行覆写');
    }
  
    // --- 构建地区组和倍率组 ---
  
    // 节点分类
    const regionGroups = Object.fromEntries(regionDefinitions.map((r) => [r.name, { ...r, proxies: [] }]));
    const otherProxies = [];
  
    for (const proxy of filteredProxies) {
      let matched = false;
      for (const region of regionDefinitions) {
        if (region.regex.test(proxy.name)) {
          regionGroups[region.name].proxies.push(proxy.name);
          matched = true;
        }
      }
  
      // 未匹配到地区组（不包含倍率组）的归为其他节点
      if (!matched) {
        otherProxies.push(proxy.name);
      }
    }
  
    // 构建地区策略组
    const generatedRegionGroups = regionDefinitions
      .filter((r) => regionGroups[r.name].proxies.length > 0)
      .flatMap((r) => createRegionGroup(r.name, r.icon, regionGroups[r.name].proxies));
  
    if (otherProxies.length > 0) {
      generatedRegionGroups.push(
        ...createRegionGroup(
          'Other',
          'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/World_Map.png',
          otherProxies,
        ),
      );
    }
  
    // --- 构建分流策略组 ---
  
    const functionalGroups = [];
    const finalRules = [...rules];
    const finalRuleProviders = { ...baseRuleProviders };
  
    // 筛选类型为 select 的地区策略组
    const groupNamesOfSelect = generatedRegionGroups.filter((g) => g.type === 'select').map((g) => g.name);
  
    // 生成基础策略组
    functionalGroups.push(
      {
        ...selectBaseOption,
        name: 'Select',
        proxies: ['Balance', 'Auto', ...groupNamesOfSelect, 'DIRECT'],
        icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png',
      },
      {
        ...loadBalanceBaseOption,
        name: 'Balance',
        proxies: [...regionGroups['HK'].proxies, ...regionGroups['JP'].proxies, ...regionGroups['TW'].proxies, ...regionGroups['SG'].proxies],
      },
      {
        ...urlTestBaseOption,
        name: 'Auto',
        proxies: ['HK-Auto', 'JP-Auto', 'TW-Auto', 'SG-Auto'],
      },
    );
  
    // 构建分流策略组
    for (const svc of serviceConfigs) {
      if (!ruleOptionsEnable[svc.name]) continue;
  
      // 添加分流策略组对应的 Rule 和 Rule Providers
      finalRules.push(...svc.rules);
      Object.assign(finalRuleProviders, svc.providers || {});
  
      // 添加分流策略组对应的节点列表
      const groupProxies = svc.reject
        ? ['REJECT']
        : ['Select', 'Balance', 'Auto', ...groupNamesOfSelect, 'DIRECT'];

      functionalGroups.push({
        ...(svc.reject
            ? rejectBaseOption 
            : selectBaseOption),
        name: svc.name,
        icon: svc.icon,
        proxies: groupProxies,
        ...(svc.defaultSelected !== undefined && {
            'default-selected': svc.defaultSelected,
        }),
      });
    }
  
    // 添加其他策略组
    functionalGroups.push(
      {
        ...selectBaseOption,
        name: 'Final',
        proxies: ['Select', 'DIRECT'],
        icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Stack.png',
      },
    );
  
    // 构建 GLOBAL 全局策略组
    const globalGroup = {
      ...selectBaseOption,
      name: 'GLOBAL',
      proxies: [...functionalGroups.map((g) => g.name), ...generatedRegionGroups.map((g) => g.name)],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png',
    };
  
    // --- 添加基础配置 ---
  
    // ---DNS配置---
  
    // 读取订阅中的 DNS 配置，保留订阅中的私有 DNS
    // 用以解决部分机场使用私有 DNS 导致无法解析节点的问题
    const originalDnsConfig = config.dns || {};
  
    // 过滤常见的公共 DNS
    const commonDnsRegex =
      /(223\.5\.5\.5|223\.6\.6\.6|119\.29\.29\.29|1\.12\.12\.12|120\.53\.53\.53|114\.114\.114\.114|180\.76\.76\.76|1\.1\.1\.1|1\.0\.0\.1|8\.8\.8\.8|8\.8\.4\.4|94\.140\.14\.14|94\.140\.15\.15|127\.0\.0\.1|alidns|doh\.pub|dot\.pub|dnspod|dns\.baidu|dns\.google|cloudflare|adguard|system)/i;
  
    const originalProxyServerNameserver = (originalDnsConfig['proxy-server-nameserver'] || []).filter(
      (dns) => !commonDnsRegex.test(String(dns)),
    );
  
    // 收集所有节点域名
    const proxyDomains = new Set(
      filteredProxies.filter((proxy) => typeof proxy.server === 'string').map((proxy) => proxy.server.toLowerCase()),
    );
  
    // 提取节点域名对应的 DNS 配置
    const originalPolicyNameserver = {};
    for (const policy of [
      originalDnsConfig['nameserver-policy'] || {},
      originalDnsConfig['proxy-server-nameserver-policy'] || {},
    ]) {
      for (const [domain, dns] of Object.entries(policy)) {
        if (proxyDomains.has(domain.toLowerCase())) {
          originalPolicyNameserver[domain] = dns;
        }
      }
    }
  
    // 国内外 DNS 定义
    const chinaDNS = ['https://dns.alidns.com/dns-query#DIRECT', 'https://doh.pub/dns-query#DIRECT'];
    const foreignDNS = ['https://dns.cloudflare.com/dns-query#Select', 'https://dns.google/dns-query#Select'];
  
    newConfig['dns'] = {
      enable: true,
      ipv6: true,
      'use-hosts': true,
      'cache-algorithm': 'arc',
      'use-system-hosts': true,
      'enhanced-mode': 'fake-ip',
      'fake-ip-range': '198.18.0.1/16',
      'fake-ip-filter': ['rule-set:private', 'rule-set:fakeip_filter'],
      'proxy-server-nameserver': [...chinaDNS, ...originalProxyServerNameserver],
      ...(Object.keys(originalPolicyNameserver).length > 0 && {
        'proxy-server-nameserver-policy': originalPolicyNameserver,
      }),
      'default-nameserver': ['223.5.5.5', '119.29.29.29'],
      nameserver: [...foreignDNS],
      'nameserver-policy': {
        'rule-set:cn': [...chinaDNS],
      },
      'direct-nameserver': ['system', '223.5.5.5', '119.29.29.29'],
    };
  
    // ---hosts 配置---
  
    // 提取订阅 hosts 中与节点域名对应的记录
    const originalHosts = config.hosts || {};
    const proxyHosts = {};
  
    for (const [host, value] of Object.entries(originalHosts)) {
      if (proxyDomains.has(host.toLowerCase())) {
        proxyHosts[host] = value;
      }
    }
  
    newConfig['hosts'] = {
      'dns.alidns.com': ['223.5.5.5', '223.6.6.6'],
      'doh.pub': ['1.12.12.12', '120.53.53.53'],
      'dns.cloudflare.com': ['1.1.1.1', '1.0.0.1'],
      'dns.google': ['8.8.8.8', '8.8.4.4'],
  
      // 解决谷歌商店无法下载的问题
      'services.googleapis.cn': ['services.googleapis.com'],
  
      // 屏蔽哔哩哔哩PCDN，解决访问视频卡顿问题
      '+.mcdn.bilivideo.com': ['0.0.0.0'],
      '+.mcdn.bilivideo.cn': ['0.0.0.0'],
      '+.edge.mountaintoys.cn': ['0.0.0.0'],
  
      // 保留机场用于节点解析的 hosts
      ...proxyHosts,
    };
  
    newConfig['allow-lan'] = true;
    newConfig['ipv6'] = true;
    newConfig['mode'] = 'rule';
    newConfig['log-level'] = 'info';
    newConfig['bind-address'] = '*';
    newConfig['unified-delay'] = true;
    newConfig['tcp-concurrent'] = true;
    newConfig['keep-alive-idle'] = 600;
    newConfig['keep-alive-interval'] = 60;
    newConfig['find-process-mode'] = 'strict';
  
    newConfig['external-controller'] = '127.0.0.1:9090';
    newConfig['external-ui'] = 'ui';
    newConfig['external-ui-url'] = 'https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip';
  
    newConfig['profile'] = {
      'store-selected': true,
      'store-fake-ip': true,
    };
  
    newConfig['ntp'] = {
      enable: true,
      'write-to-system': false,
      server: 'ntp.aliyun.com',
      port: 123,
      interval: 60,
    };
  
    newConfig['tun'] = {
      enable: true,
      stack: 'system',
      'auto-route': true,
      'strict-route': true,
      'auto-redirect': true,
      'auto-detect-interface': true,
      'dns-hijack': ['any:53', 'tcp://any:53'],
    };
  
    // 添加节点
    newConfig['proxies'] = [
      ...filteredProxies,
      {
        name: '🇨🇳 Direct',
        type: 'direct',
      },
    ];
  
    newConfig['proxy-groups'] = [globalGroup, ...functionalGroups, ...generatedRegionGroups];
    newConfig['rule-providers'] = finalRuleProviders;
  
    newConfig['rules'] = [
      'RULE-SET,github,Select',
  
      ...finalRules,
  
      // 兜底规则
      'RULE-SET,gfw,Select',
      'RULE-SET,cn_additional,DIRECT',
      'RULE-SET,cn_ip,DIRECT',
      'MATCH,Final',
    ];
  
    return newConfig;
  }