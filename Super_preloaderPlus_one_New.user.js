(function() {
// ==UserScript==
// @name         Super_preloaderPlus_one_New
// @name:zh-CN   Super_preloaderPlus_one_��
// @namespace    https://github.com/ywzhaiqi
// @description  Preload and Autopagerize, Forked from https://greasyfork.org/scripts/293-super-preloaderplus-one with additional rule
// @description:zh-cn  Ԥ��+��ҳ..ȫ��������������... �޸���https://greasyfork.org/scripts/293-super-preloaderplus-one with additional rule
// @author       Mach6(ԭ���� ywzhaiqi && NLF)
// @version      6.5.1
// @homepageURL  https://greasyfork.org/en/scripts/33522-super-preloaderplus-one-new

// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand

// @include      http*
// @exclude      http*://mail.google.com/*
// @exclude      http*://maps.google*
// @exclude      http*://www.google.com/reader*
// @exclude      http*://www.google.com/calendar*
// @exclude      https://docs.google.com/*
// @exclude      http*://app.yinxiang.com/*
// @exclude      http*://www.dropbox.com/*
// @exclude      http*://www.toodledo.com/*
// @exclude      http://cloud.feedly.com/*
// @exclude      http://weibo.com/*
// @exclude      http://w.qq.com/*
// @exclude      http://web2.qq.com/*
// @exclude      http://openapi.qzone.qq.com/*
// @exclude      http://*cloud.vip.xunlei.com/*
// @exclude      http*://www.wumii.com/*
// @exclude      http://pan.baidu.com/*
// @exclude      http://yun.baidu.com/*
// @exclude      http://www.cnbeta.com/*
// @exclude      http://www.youku.com/
// @exclude      http://v.youku.com/*
// @exclude      http://www.iqiyi.com/*
// @exclude      http://www.duokan.com/reader/*
// ==/UserScript==


// ��Ҫ���� chrome ԭ���¼����£�Ҳ�������ֶ�������
var scriptInfo = {
    version: '6.5.1',
    updateTime: '2017/09/27',
    homepageURL: 'https://greasyfork.org/en/scripts/33522-super-preloaderplus-one-new',
    downloadUrl: 'https://greasyfork.org/scripts/33522-super-preloaderplus-one-new/code/Super_preloaderPlus_one_New.user.js',
    metaUrl: 'https://greasyfork.org/scripts/33522-super-preloaderplus-one-new/code/Super_preloaderPlus_one_New.meta.js',
};


//----------------------------------
// rule.js

if (window.name === 'mynovelreader-iframe') {
    return;
}

// �����ȡ����һҳʹ�õ�iframe window
if (window.name === 'superpreloader-iframe') { // �ѹ�,iframe������ô������js��?
    // ȥ����ԭ�����һ�ַ�������Ϊ�°汾 chrome �Ѿ�֧�֡��ɰ汾 chrome iframe���� �޷�����window.parent,����undefined

    var domloaded = function (){  // �������ײ�,���,ĳЩʹ�ù����¼�����ͼƬ����վ.
        window.scroll(window.scrollX, 99999);
        window.parent.postMessage('superpreloader-iframe:DOMLoaded', '*');
    };
    if(window.opera){
        document.addEventListener('DOMContentLoaded', domloaded, false);
    } else {
        domloaded();
    }

    return;
}


// GM ����

gmCompatible();

/////////////////////����(��ע�⿪�ص�������ϵ..�ӿ���һ���ڸ�����Ϊtrue��ʱ��Ż���Ч.)//////////////////////
var prefs={
    floatWindow: true,       // ��ʾ������
        FW_position: 2,         // 1:���������Ͻ�;2:���������Ͻ�;3�����������½�;4�����������½�;
        FW_offset: [20, 38],    // ƫ���ߵĴ�ֱ��ˮƽ�������ֵ..(��λ:����)
        FW_RAS: true,           // ����������ϵı��水ť..����ˢ��ҳ��;
    pauseA: true,            // ����ֹͣ�Զ���ҳ(��ǰģʽΪ��ҳģʽ��ʱ����Ч.);
        Pbutton: [2, 0, 0],     // ��Ҫ��ס�ļ�.....0: ����ס�κμ�;1: shift�I;2: ctrl�I; 3: alt�I;(ͬʱ��3����.���� 1 2 3)(һ��������.���� 0 0 0)
        mouseA: true,           // ��ס������..����.˫��;
            Atimeout: 200,      // ��ס���ʱ..��ʱ.������Ч..(��λ:����);
        stop_ipage: true,       // �����������ҳ��������ͣ.�������ú�.���ڼ���..������ҳ..

    Aplus: true,             // �Զ���ҳģʽ��ʱ��..��ǰԤ����һҳ..���Ƿ����1ҳ,����Ԥ����2ҳ,�����2ҳ,����Ԥ����3ҳ..(����ӿ췭ҳ���-_-!!)(���鿪��)..
    sepP: true,              // ��ҳģʽ��.�ָ���.��ʹ���Ϲ�һҳ���¹�һҳ��ʱ���Ƿ񱣳����λ��..
    sepT: true,              // ��ҳģʽ��.�ָ���.��ʹ���Ϲ�һҳ���¹�һҳ��ʱ��ʹ�ö�������..
        s_method: 3,            // ������ʽ 0-10 һ��11�ֶ���Ч��..�Լ����԰�
        s_ease: 2,              // ���뵭��Ч�� 0������ 1������ 2�����뵭��
        s_FPS: 60,              // ֡��.(��λ:֡/��)
        s_duration: 333,        // ��������ʱ��.(��λ:����);
    someValue: '',           // ��ʾ�ڷ�ҳ�������ұߵ�һ��С����..-_-!!..Powered by Super_preloader ������
    DisableI: true,          // ֻ�ڶ��㴰�ڼ���JS..��������..�������������,��ôDIExclude������Ч,�������ҳ��ʹ���ڶ��㴰��Ҳ�����....
    arrowKeyPage: true,      // ����ʹ�� ���ҷ���� ��ҳ..
    sepStartN: 2,            // ��ҳ�����ϵ�,�Ӽ���ʼ����.(ò�������������,����Ū�����س���,������.-_-!!)

    // �������޸ĵ�
    forceTargetWindow: GM_getValue('forceTargetWindow', true),  // ��һҳ���������ó����±�ǩҳ��
    debug: GM_getValue('debug', false),
    enableHistory: GM_getValue('enableHistory', false),    // ����һҳ������ӵ���ʷ��¼
    autoGetPreLink: false,   // һ��ʼ���Զ�������һҳ���ӣ���Ϊ����ʱ�ٲ���
    excludes: GM_getValue('excludes', ''),
    custom_siteinfo: GM_getValue('custom_siteinfo', '[]'),
    lazyImgSrc: 'zoomfile|file|original|load-src|_src|imgsrc|real_src|src2|data-lazyload-src|data-ks-lazyload|data-lazyload|data-src|data-original|data-thumb|data-imageurl|data-defer-src|data-placeholder',
};

// ������,��վ����..
var blackList=[
    // ����
    // 'http://*.douban.com/*',
];

blackList = blackList.concat(prefs.excludes.split(/[\n\r]+/).map(function(line) {
    return line.trim();
}));


//��������վ�������ڷǶ��㴰���ϼ���JS..����è��֮��Ŀ�ܼ���ҳ.
var DIExclude = [
    ['è������', true, /http:\/\/dzh\.mop\.com\/[a-z]{3,6}\/\d{8}\/.*\.shtml$/i],
    ['��Ѫ����', true, /^http:\/\/bbs\.tiexue\.net\/.*\.html$/i],
    ['��Ѫ����-2', true, /^http:\/\/bbs\.qichelian\.com\/bbsqcl\.php\?fid/i],
    // �� http://so.baiduyun.me/ ��Ƕ�İٶȡ�Google ���
    ['�ٶ�������������-�ٶ�', true, /^https?:\/\/www\.baidu\.com\/baidu/i],
    ['�ٶ�������������-Google', true, /^https?:\/\/74\.125\.128\.147\/custom/i],
];

// ҳ�治ˢ�µ�վ��
var HashchangeSites = [
    { url: /^https?:\/\/(www|encrypted)\.google(stable)?\..{2,9}\/(webhp|#|$|\?)/, timer: 2000, mutationSelector: '#main' },
    // ��Ӫ�̿��ܻ��� #wd= ǰ����� ?tn=07084049_pg
    { url: /^https?:\/\/www\.baidu\.com\/($|#wd=)/, timer: 1000, mutationSelector: '#wrapper_wrapper' },
    { url: /^https?:\/\/www\.newsmth\.net/, timer: 1000 },
];

//////////////////////////---------------����-------////////////////
//��ҳ��Ҫ��վ����Ϣ.
//�߼������һЩĬ������..����㲻֪����ʲô..����ز�Ҫ�޸�(ɾ��)��.���޸Ļ�Ӱ�쵽���и߼�����...
var SITEINFO_D={
    enable: true,               // ����
    useiframe: GM_getValue('SITEINFO_D.useiframe') || false,           // (Ԥ��)�Ƿ�ʹ��iframe..
    viewcontent: false,         // �鿴Ԥ��������,��ʾ��ҳ������·�.
    autopager: {
        enable: true,           // �����Զ���ҳ...
        force_enable: GM_getValue('SITEINFO_D.autopager.force_enable') || false,  //Ĭ������ǿ��ƴ��
        manualA: false,         // �ֶ���ҳ.
        useiframe: false,       // (��ҳ)�Ƿ�ʹ��iframe..
            iloaded: false,     // �Ƿ���iframe��ȫload�����..������DOM��ɺ����
            itimeout: 0,        // ��ʱ���ٺ����,�ڲ���..
            newIframe: false,
        remain: 1,              // ʣ��ҳ��ĸ߶�..����ʾ�߶ȵ� remain ����ʼ��ҳ..
        maxpage: 99,            // ��෭����ҳ..
        ipages: [false, 2],     // ������ҳ,��һ���ǿ����Ƿ���js���ص�ʱ���������ڶ���(����С��maxpage)��ҳ��,����[true,3].����˵JS���غ�.������3ҳ.
        separator: true,        // ��ʾ��ҳ����..(�Ƽ���ʾ.)
            separatorReal: true,  // ��ʾ��ʵ��ҳ��
    }
};

//�����ȼ�����,��һ���ǽ̳�.
var SITEINFO=[
    {name: 'Google����',                                                                                                                               //վ������...(��ѡ)
        url: '^https?://(?:(?:www|encrypted)\\.google(?:stable)?\\..{2,9}|wen\\.lu)/(?:webhp|search|#|$|\\?)',   // վ������...(~~����~~)
        //url:'wildc;http://www.google.com.hk/search*',
        siteExample:'http://www.google.com',                                                                                                //վ��ʵ��...(��ѡ)
        enable:true,                                                                                                                                            //����.(�ܿ���)(��ѡ)
        useiframe:false,                                                                                                                                        //�Ƿ���iframeԤ��...(��ѡ)
        viewcontent:false,

        nextLink: 'id("pnnext") | id("navbar navcnt nav")//td[span]/following-sibling::td[1]/a | id("nn")/parent::a',                                                                                                                           //�鿴Ԥ��������,��ʾ��ҳ������·�.(��ѡ)
        // nextLink:'auto;',
        //nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',              //��һҳ���� xpath ���� CSSѡ���� ���� ��������ֵ(�˺�������ʹ�õ�һ������Ĳ�����Ϊdocument����) (~~��ѡ~~)
        //nextLink:'css;table#nav>tbody>tr>td.b:last-child>a',
        //nextLink:function(D,W){return D.evaluate('//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',D,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;},
        // ���� Array �ĸ�ʽ�����β���

        // preLink:'auto;',
        preLink: '//a[@id="pnprev"]',
        //preLink:'//table[@id="nav"]/descendant::a[1][parent::td[@class="b"]]',            //��һҳ���� xpath ���� CSSѡ���� ���� ��������ֵ (��ѡ)
        autopager:{
            enable:true ,                                                                                               //����(�Զ���ҳ)(��ѡ)
            useiframe:false,                                                                                        //�Ƿ�ʹ��iframe��ҳ(��ѡ)
                iloaded:false,                                                                                      //�Ƿ���iframe��ȫload֮�����..������DOM��ɺ����.
                itimeout:0,                                                                                             //��ʱ���ٺ����,�ڲ���..
                newIframe: false,  // ��һҳʹ���µ� iframe���ܽ����ť�޷����������
            pageElement: '//div[@id="ires"]',                                          //�������� xpath �� CSSѡ���� ��������ֵ(~~����~~)
            // pageElement:'css;div#ires',
            //pageElement:function(doc,win){return doc.getElementById('ires')},
            //filter:'//li[@class="g"]',                                                                        //(�����δ���)xpath �� CSSѡ������ƥ�䵽�Ľڵ�������˵����ϵĽڵ�.
            remain: 1/3,                                                                                                 //ʣ��ҳ��ĸ߶�..����ʾ�߶ȵ� remain ����ʼ��ҳ(��ѡ)
                relatedObj: ['css;div#navcnt','bottom'],                                                         //�����Ԫ�ص�����׵�Ԫ��,����ҳ���ܸ߶ȵļ���.(��ѡ)
            replaceE: '//div[@id="navcnt"]',                 //��Ҫ�滻�Ĳ��� xpat h�� CSSѡ���� һ����ҳ��ı����ķ�ҳ����(��ѡ);
            //replaceE:'css;div#navcnt',
            ipages: [false,3],                               //������ҳ,��һ���ǿ����Ƿ���js���ص�ʱ���������ڶ���(����С��maxpage)��ҳ��,����[true,3].����˵JS���غ�.������3ҳ.(��ѡ)
            separator: true,                                 //�Ƿ���ʾ��ҳ����(��ѡ)
                separatorReal: true,
            maxpage: 66,                                     //��෭ҳ����(��ѡ)
            manualA: false,                                  //�Ƿ�ʹ���ֶ���ҳ.
            HT_insert: ['//div[@id="res"]',2],               //���뷽ʽ����Ϊһ������: [�ڵ�xpath��CSSѡ����,���뷽ʽ(1�����뵽�����ڵ�֮ǰ;2�����ӵ������ڵ������;)](��ѡ);
            //HT_insert:['css;div#res',2],
            lazyImgSrc: 'imgsrc',
            // �������Զ�����ʽ����������ǵ��� Google ��һҳ���ܳ��ֵ�ͼƬ�������⡣
            stylish: 'hr.rgsep{display:none;}' +
                '.rg_meta{display:none}.bili{display:inline-block;margin:0 6px 6px 0;overflow:hidden;position:relative;vertical-align:top}._HG{margin-bottom:2px;margin-right:2px}',
            documentFilter: function(doc){
                // ������һҳ��ͼƬ
                var x = doc.evaluate('//script/text()[contains(self::text(), "data:image/")]', doc, null, 9, null).singleNodeValue;
                if (x) {
                    try {
                        new Function('document, window, google', x.nodeValue)(doc, unsafeWindow, unsafeWindow.google);
                    } catch (e) {}
                }

                // �������ܳ��ֵ� С��ͷ���ఴť �Ű治��ȷ�������2014-7-29��
                var oClassName = window.document.querySelector('#ires .ab_button').className;
                [].forEach.call(doc.querySelectorAll('#ires .ab_button'), function(elem){
                    if (elem.className != oClassName)
                        elem.className = oClassName;
                });
            },
            filter: function() {  // ��������ݵ�ҳ�������

            },
            startFilter: function(win, doc) {  // ֻ����һ��
                // �Ƴ� Google �ض���
                var script = doc.createElement('script');
                script.type = 'text/javascript';
                script.textContent = '\
                    Object.defineProperty(window, "rwt", {\
                        configurable: false,\
                        enumerable: true,\
                        get: function () {\
                            return function() {};\
                        },\
                    });\
                ';
                doc.documentElement.appendChild(script);
                doc.documentElement.removeChild(script);

                // �ƶ������������һҳ
                var brs = doc.getElementById('brs'),
                    ins = doc.getElementById('ires');
                if (brs && ins) {
                    ins.appendChild(brs);
                }
            }
        }
    },
    {name: '�ٶ�����',
        // ���� Super_preloader Ĭ��ȥ���� # ���沿��
        // url: "^https?://www\\.baidu\\.com/(s|baidu|#wd=)",
        url: "^https?://www\\.baidu\\.com/",
        enable:true,
        nextLink:'//div[@id="page"]/a[contains(text(),"��һҳ")][@href]',
        preLink:'//div[@id="page"]/a[contains(text(),"��һҳ")][@href]',
        autopager: {
            pageElement: 'css;div#content_left > *',
            HT_insert:['css;div#content_left',2],
            replaceE: 'css;#page',
            stylish: '.autopagerize_page_info, div.sp-separator {margin-bottom: 10px !important;}',
            startFilter: function(win) {
                // ���ðٶ���������Ϊ s?wd=
                try {
                    win.document.cookie = "ISSW=1";
                } catch (ex) {}
            }
        }
    },
    {name: '�ٶ����� - baidulocal',
        url: '^https?://www\\.baidu\\.com/s.*&tn=baidulocal',
        nextLink: '//a[font[text()="��һҳ"]]',
        pageElement: '//table[@width="100%" and @border="0"]/tbody/tr/td/ol',
        exampleUrl: 'http://www.baidu.com/s?wd=firefox&rsv_spt=1&issp=1&rsv_bp=0&ie=utf-8&tn=baidulocal&inputT=1364',
    },
    {name: '360����',
        url: "http://www\\.so\\.com/s",
        nextLink:'//div[@id="page"]/a[text()="��һҳ>"] | id("snext")',
        autopager:{
            pageElement:'//div[@id="container"]',
            stylish: '.autopagerize_page_info, div.sp-separator { margin-bottom: 20px !important; }'
        }
    },
    {name: '�ѹ�����',
        url:/^https?:\/\/www\.sogou\.com\/(?:web|sogou)/i,
        siteExample:'http://www.sogou.com',
        enable:true,
        nextLink:'//div[@id="pagebar_container"]/a[@id="sogou_next"]',
        autopager:{
            pageElement:'//div[@class="results"]',
            replaceE: 'id("pagebar_container")'
        }
    },
    {name: 'Bing��ҳ����',
        url:/bing\.com\/search\?q=/i,
        siteExample:'bing.com/search?q=',
        nextLink:'//nav[@aria-label="navigation"]/descendant::a[last()][@class="sb_pagN"]',
        autopager:{
            pageElement: '//ol[@id="b_results"]/li[@class="b_algo"]',
            replaceE: '//nav[@aria-label="navigation"]'
        }
    },
    {name: '�е���ҳ����',
        url: /http:\/\/www\.youdao\.com\/search\?/i,
        siteExample: 'http://www.youdao.com/search?',
        nextLink: '//div[@class="c-pages"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//ol[@id="results"]',
            replaceE: 'id("resc")/div[@class="c-pages"]'
        }
    },
    {name: 'SoSo��ҳ����',
        url:/http:\/\/www\.soso\.com\/q/i,
        siteExample:'http://www.soso.com/q',
        nextLink:'//div[@class="pg"]/descendant::a[last()][@class="next"]',
        autopager:{
            // useiframe:true,
            pageElement:'//div[@id="result"]/ol/li',
            replaceE: 'id("pager")'
        }
    },
    {name: 'Disconnect Search',
        url: /^https?:\/\/search\.disconnect\.me\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("results")',
            replaceE: '//div[@class="pagination"]',
        }
    },
    {name: 'AOL ����',
        url: '^http://(www\\.)aolsearch.com/search\\?.+?[?&]q=',
        siteExample: 'http://www.aolsearch.com/search?q=test',
        nextLink: '//a[span[@class="nextRes"][text()="Next"]]',
        autopager: {
            pageElement: '//*[@id="c"]/div'
        }
    },
    {name: '���ѿ�',
       url: /^https?:\/\/gusouk\.com\/search/i,
       siteExample: 'http://gusouk.com/search?q=firefox',
       nextLink: 'auto;',
       autopager: {
           pageElement: '//div[@class="search_result"]'
       }
    },
    {name: 'tmd123����',  // www.tmd123.com
       url: /^https?:\/\/54\.64\.24\.234\/search/i,
       siteExample: 'http://54.64.24.234/search/?q=firefox',
       nextLink: 'auto;',
       autopager: {
           pageElement: '//div[@class="search_result"]'
       }
    },
    {name: "Google custom",
        url: /^https?:\/\/74\.125\.128\.147\/custom/i,
        nextLink: 'id("pnnext") | id("navbar navcnt nav")//td[span]/following-sibling::td[1]/a | id("nn")/parent::a',
        autopager: {
            pageElement: '//div[@id="res"]',
        }
    },

    // ====== Ŀǰ Super_preloaderPlus_one ��������� ========
    {name: 'ˮľ����',
        url: '^http://www\\.newsmth\\.net/nForum',
        nextLink: '//a[@title="��һҳ"]',
        pageElement: '//div[@class="b-content"] | //div[@class="b-content corner"]',
        exampleUrl: 'http://www.newsmth.net/nForum/#!board/TouHou'
    },

    // =============== baidu ���� ===========
    {name: '�ٶ������б�',
        url: /^http:\/\/tieba\.baidu\.(cn|com)\/f/i,
        nextLink: '//div[@class="pager clearfix"]/descendant::a[@class="next"]',
        preLink: '//div[@class="pager clearfix"]/descendant::a[@class="pre"]',
        autopager: {
            enable: false,
            pageElement: '//ul[@id="thread_list"]/li',
            replaceE: 'css;#frs_list_pager',
            useiframe: true,
                // newIframe: true,
                iloaded: true,
            // lazyImgSrc: "bpic",
        }
    },
    {name: '�ٶ���������',
        url:/^http:\/\/tieba\.baidu\.com\/p/i,
        siteExample:'http://tieba.baidu.com/p/918674650',
        nextLink:'//ul[@class="l_posts_num"]/descendant::a[text()="��һҳ"]',
        preLink:'//ul[@class="l_posts_num"]/descendant::a[text()="��һҳ"]',
        autopager:{
            enable: false,
            pageElement: "id('j_p_postlist')",  // "css;.l_post"
            replaceE: "css;.l_posts_num > .l_pager",
            useiframe: true,
                // newIframe: true,
                iloaded: true
            // filter: function(pages){
            //     var pb = unsafeWindow.pb;
            //     pb.ForumListV3.initial();
            // }
        }
    },
    {name: '�ٶȰ�������',
        url: /^http:\/\/tieba\.baidu\.com\/f\/search/i,
        siteExample: 'http://tieba.baidu.com/f/search/',
        nextLink: 'auto;',
        pageElement: 'css;.s_post'
    },
    {name: '�ٶ���������',
        url: '^http://news\\.baidu\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/ns',
        nextLink: 'id("page")/a[text()="��һҳ>"]',
        pageElement: 'id("content_left")',
    },
    {name: '�ٶ�֪��',
        url:/^https?:\/\/zhidao\.baidu\.com\/search\?/i,
        siteExample:'http://zhidao.baidu.com/search?pn=0&&rn=10&word=%BD%AD%C4%CFstyle',
        nextLink:'auto;',
        pageElement:'css;#wgt-list',
    },
    {name: '�ٶȿռ�',
        url: '^http://hi\\.baidu\\.com',
        nextLink: 'id("pagerBar")/div/a[@class="next"]',
        autopager: {
            useiframe: true,
            pageElement: '//div[@class="mod-realcontent mod-cs-contentblock"]',
        },
        exampleUrl: 'http://hi.baidu.com/gelida',
    },
    {name: '�ٶ��Ŀ�����',
        url: /^http:\/\/wenku\.baidu\.com\/search\?/i,
        exampleUrl: 'http://wenku.baidu.com/search?word=firefox&lm=0&od=0&fr=top_home',
        nextLink: '//div[@class="page-content"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[@class="search-result"]',
        }
    },

    // ================ news��Reading ===========================
    {name: '��������',
        url: /^http:\/\/[a-z]+\.sina\.com\.cn\//i,
        exampleUrl: 'http://news.sina.com.cn/c/sd/2013-11-08/165728658916.shtml',
        nextLink: '//p[@class="page"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@id="artibody"]',
            relatedObj: true,
        }
    },
    {name: '�Ѻ�����',
        url: /^http:\/\/news\.sohu\.com\/.*\.shtml/i,
        exampleUrl: 'http://news.sohu.com/20120901/n352071543.shtml',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("contentText")',
        }
    },
    {name: '�»�������ҳ��',
        url:/http:\/\/news\.xinhuanet\.com\/.+\/\d+-/i,
        siteExample:'http://news.xinhuanet.com/politics/2010-07/19/c_12347755.htm',
        nextLink:'//div[@id="div_currpage"]/a[text()="��һҳ"]',
        autopager:{
            remain:2,
            pageElement:'//table[@id="myTable"] | id("content")'
        }
    },
    {name: '��Ѷ��-�����,����',
        url: /^http:\/\/[a-z]+\.qq\.com\/.*\.htm/i,
        exampleUrl: 'http://cd.qq.com/a/20131119/002713.htm',
        nextLink: 'id("ArtPLink")/ul/li/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("Cnt-Main-Article-QQ")',
            relatedObj: true,
            replaceE: "css;#ArtPLink"
        }
    },
    {name: '�������',
        url: /^http:\/\/[a-z]+\.qq\.com\/(?:forum\.php|.*\.htm)/i,
        exampleUrl: 'http://mycd.qq.com/forum.php?mod=forumdisplay&fid=1001037360&page=',
        nextLink: '//div[@class="pgb"]/a[@class="nxt"]',
        autopager: {
            pageElement: 'id("threadlisttableid") | id("postlist") | id("threadlist")/table',
            replaceE: 'css;.page_box .pgb',
            lazyImgSrc: 'zoomfile'
        }
    },
    {name: '�й�������',
        url:/http:\/\/www\.chinanews\.com\/[a-z]+\/.+\.shtml/i,
        siteExample:'http://www.chinanews.com/Ӣ��/��/����/���.shtml',
        nextLink: '//div[@id="function_code_page"]/a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@class="left_zw"] | //div[@class="hd_photo"]',
            relatedObj: true,
            HT_insert:['//div[@id="function_code_page"]',1],
            filter:'//div[@id="function_code_page"]',
        }
    },
    {name: '����������',
        url: /^http:\/\/[a-z]+\.people\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://ent.people.com.cn/n/2013/0823/c1012-22672732-2.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="text_img"] | //div[@id="p_content"]',
            relatedObj: true
        }
    },
    {name: '�йش���������ҳ��',
        url:/http:\/\/(?:[^\.]+\.)?zol\.com\.cn\/\d+\/\d+/i,
        siteExample:'http://lcd.zol.com.cn/187/1875145.html',
        nextLink: '//div[@class="page"]/a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="cotent_idd" or @id="article-content"]',
            relatedObj: true,
            replaceE: 'css;.page'
        }
    },
    {name: 'FT������',
        url: /^http:\/\/www\.ftchinese\.com\/story\//i,
        exampleUrl: 'http://www.ftchinese.com/story/001053472',
        nextLink: '//div[@class="pagination"]/a[text()="����ȫ��"]',
        autopager: {
            pageElement: '//div[@id="bodytext"]',
            relatedObj: true,
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: 'Solidot: ��͵���Ѷ����Ҫ�Ķ���',
        url: /^http:\/\/www\.solidot\.org\//i,
        exampleUrl: 'http://www.solidot.org/?issue=20131205',
        nextLink: 'id("center")/div[@class="page"]/a[last()]',
        autopager: {
            pageElement: 'id("center")/div[@class="block_m"]',
            separatorReal: false
        }
    },
    {name: 'IT ֮��',
        url: /^http:\/\/\w+\.ithome\.com\//i,
        nextLink: 'id("Pager")/div[@class="pagenew"]/a[text()=">"]',
        autopager: {
            pageElement: 'id("wrapper")/div[@class="content fl"]/div[@class="cate_list" or @class="post_list"]/ul[@class="ulcl"]',
            replaceE: 'id("Pager")/div[@class="pagenew"]'
        }
    },
    {name: '������',
        url: "^http://www\\.huxiu\\.com/",
        nextLink: '//span[@class="next"]/a[text()=">"]',
        pageElement: '//div[@class="center-ctr-box"]'
    },
    {name: '36�',
        url: "^http://www\\.36kr\\.com/.+",
        nextLink: '//a[@rel="next"]',
        pageElement: 'id("mainContainer")/descendant::div[contains(concat(" ", @class, ""),"krContent")]'
    },
    {name: '������ �� Beats of Bits - ���ִ��¼�ֵ�ĿƼ�ý��',
        url: "^http://www\\.ifanr\\.com/",
        nextLink: '//div[@class="content-nav"]/a[text()="��һҳ"]',
        pageElement: 'id("content")/div[contains(concat(" ", @class, ""), "main")]'
    },
    {name: '��ҵ��',
        url: /^http:\/\/www\.cyzone\.cn\//i,
        exampleUrl: 'http://www.cyzone.cn/',
        nextLink: 'id("pages")/*[@class="current"]/following-sibling::a[1]',
        autopager: {
            pageElement: '//div[@class="left"]/div[starts-with(@class, "intere")]/ul[@class="list clearfix"]',
        }
    },
    {name: '�ܲ���',
        url: /^http:\/\/luo\.bo\//i,
        exampleUrl: 'http://luo.bo/',
        nextLink: '//div[@class="pagenavi"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="homeposts"]/ul[contains(@class, "explist homelist")] | //div[@class="container"]/div[@class="content"]',
            replaceE: '//div[@class="pagenavi"]'
        }
    },
    {name: '������ Evolife.cn_�Ƽ���������',
        url: /^http:\/\/[a-z]+\.evolife\.cn\//i,
        exampleUrl: 'http://go.evolife.cn/category/focus_121_1.html',
        nextLink: '//div[contains(@class, "pages")]/a[text()="��һҳ" or contains(text(), ">")]',
        autopager: {
            pageElement: '//div[@class="zuijingengxin"]/div[@class="zuijingengxin_box"] | //div[@class="zuijingengxin"]/div[@class="text"]',
            replaceE: 'css;.pages',
            relatedObj: true,
        }
    },
    {name: '����� - �������',
        url: /^http:\/\/auto\.ifeng\.com\/.*\.shtml/i,
        exampleUrl: 'http://auto.ifeng.com/youji/20131115/1003513.shtml',
        nextLink: '//div[@class="arl-pages"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[starts-with(@class,"arl-mian")]/div/div[@class="arl-cont"]',
            relatedObj: true,
            replaceE: '//div[@class="arl-pages"]'
        }
    },
    {name: '����� - ���š��ƾ�',
        url: /^http:\/\/\w+\.ifeng\.com\//i,
        exampleUrl: 'http://finance.ifeng.com/a/20131115/11089994_1.shtml',
        nextLink: '//a[@id="pagenext"] | //div[@class="next" or @class="fy"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@id="artical_real"] | //div[@class="content"]/div[@class="contentL"] | //div[@class="yib_left"]/div[@class="box_list"]',
            relatedObj: true,
            replaceE: 'id("artical")/div[@class="an"]/div[@class="next"] | //div[@class="yib_left"]/div[@class="fy"]'
        }
    },
    {name: '��Ѷ�ƾ�΢��',
        url: /^http:\/\/t\.hexun\.com\/.*\.html/i,
        exampleUrl: 'http://t.hexun.com/21210301/default.html',
        nextLink: '//li[contains(@class, "nextbtn2")]/a[text()="��һҳ >"]',
        autopager: {
            pageElement: '//div[@id="listWeibo"]',
            replaceE: '//div[@id="page2"]'
        }
    },
    {name: '��Ѷ����',
        url: /^http:\/\/\w+\.blog\.hexun\.com\//i,
        exampleUrl: 'http://23802543.blog.hexun.com/',
        nextLink: function(doc) {
            var url = doc.querySelector('.PageSkip_1 a[title="��һҳ"]').getAttribute('href');
            url = url.replace(/(\/p\d+\/).*/, '$1default.html');
            return url;
        },
        autopager: {
            pageElement: 'id("DefaultContainer1_ArticleList_Panel1")'
        }
    },
    {name: '����֮��',
        url: /^http:\/\/www\.autohome\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://www.autohome.com.cn/culture/201310/643479-7.html',
        nextLink: 'id("articlewrap")/div[@class="page"]/a[@class="page-item-next"]',
        autopager: {
            pageElement: 'id("articleContent")',
            relatedObj: true,
            replaceE: 'id("articlewrap")/div[@class="page"]'
        }
    },
    {name: '����֮����̳���Ӻ��б�',
        url:/^http:\/\/club\.autohome\.com\.cn\/bbs/i,
        siteExample:'http://club.autohome.com.cn/bbs/forum-c-2313-1.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//dl[@class="list_dl "][@lang] | //div[@class="conmain"]',
        }
    },
    {name: '��������',
        url: /^http:\/\/yp\.xcar\.com\.cn\/.*\.html/i,
        exampleUrl: 'http://yp.xcar.com.cn/201311/news_1351064_1.html',
        nextLink: '//div[@class="article_page_bottom"]/a[@class="page_down"]',
        autopager: {
            pageElement: 'id("newsbody")',
            relatedObj: true,
            replaceE: '//div[@class="article_page_bottom"]'
        }
    },
    {name: '����������̳����',
        url:/^http:\/\/www\.xcar\.com\.cn\/bbs\/viewthread/i,
        siteExample:'http://www.xcar.com.cn/bbs/viewthread.php?tid=12474760',
        nextLink:'//a[text()="��һҳ��"][@href]',
        autopager:{
            pageElement:'//form[@id="delpost"] | //div[@class="maintable"][@id="_img"]',
        }
    },
    {name: '���� - ���ô�����',
        url: /^http:\/\/www\.sinonet\.org\/.*\.html/i,
        exampleUrl: 'http://www.sinonet.org/news/society/2013-11-15/301940.html',
        nextLink: '//p[@class="pageLink"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("zoom")',
            relatedObj: true
        }
    },
    {name: '����������',
        url: /^http:\/\/news\.sinovision\.net\/.*\.htm/i,
        exampleUrl: 'http://news.sinovision.net/politics/201401/00279206.htm',
        nextLink: '//div[@class="pg"]/a[@class="nxt"]',
        autopager: {
            pageElement: '//div[@class="d"]/table[@class="vwtb"]',
            replaceE: '//div[@class="pg"]',
            relatedObj: true
        }
    },
    {name: '���������й����ȵ����������Ż�',
        url: /^http:\/\/news\.hxsd\.com\/.*\.html/i,
        exampleUrl: 'http://news.hxsd.com/CG-dynamic/201401/684528.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="news_content_left"]/div[@class="content"]',
        }
    },
    {name: '��Ѫ��',
        url: /^http:\/\/bbs\.tiexue\.net\/post.*\.html/i,
        exampleUrl: 'http://bbs.tiexue.net/post2_7969883_3.html',
        nextLink: '//div[@class="page"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("postContent")/div[@class="newconli2"]',
            relatedObj: true
        }
    },
    {name: '������',
        url: /^http:\/\/www\.vistastory\.com\/.*\.html/i,
        exampleUrl: 'http://www.vistastory.com/a/201408/5395.html',
        nextLink: '//a[@class="cpnext"]',
        autopager: {
            pageElement: 'css;.arc_body',
        }
    },
    {name: '������Ϣ',
        url: '^http://china\\.cankaoxiaoxi\\.com/.*\\.shtml',
        nextLink: 'id("next_page")',
        pageElement: 'id("ctrlfscont")',
        exampleUrl: 'http://china.cankaoxiaoxi.com/roll10/2014/0817/464381.shtml',
    },
    {name: '�й���ɽ��Ƶ��',
        url: '^http://sd\\.china\\.com\\.cn/.*\\.html',
        autopager: {
            pageElement: 'css;.content',
                relatedObj: true,
        }
    },
    {name: '��������',
        url: '^http://club\\.kdnet\\.net/list\\.asp',
        nextLink: 'auto;',
        pageElement: '//div[@class="lf w840px"]/div[@class="list-table"]/table',
        exampleUrl: 'http://club.kdnet.net/list.asp?t=0&boardid=1&selTimeLimit=0&action=&topicmode=0&s=&page=1',
    },
    {name: 'ľľ��ժ',
        url: 'http://www\\.85nian\\.net/',
        nextLink: 'auto;',
        pageElement: 'css;.entry-content'
    },

    //--- ��������
    {name: 'TouringCarTimes',
        url: /^http:\/\/www\.touringcartimes\.com\/category\//i,
        nextLink: '//li[@class="bpn-next-link"]/a',
        autopager: {
            pageElement: '//div[@id="archive_page_wrapper"]',
        }
    },
    {name: 'tomshardware',
        url: /^http:\/\/www\.tomshardware\.com\//i,
        exampleUrl: 'http://www.tomshardware.com/reviews/chrome-27-firefox-21-opera-next,3534-2.html',
        nextLink: '//li[@class="item icon active"]/following::a[1]',
        autopager: {
            pageElement: '//article[@id="news-content"]',
        }
    },

    // ========================= video =====================
    {name: '�ſ���Ƶ',
        url: /^http:\/\/(?:www|u|i|tv)\.youku\.com\//i,
        nextLink: '//a[@title="��һҳ"] | //li[@class="next"]/a[text()="��һҳ"] | //a[em/@class="ico_next"] | //a[span/@class="ico__pagenext"]',
        autopager: {
            pageElement: '//div[@id="list" or @id="listofficial"] | id("getVideoList") | id("imgType") | //div[@class="YK_main" or @class="mainCol"]/descendant::div[@class="items"]',
        }
    },
    {name: "�ѿ�-ר����Ƶ",
        url: "^http://www\\.soku\\.com/",
        nextLink: '//li[@class="next"]/a[@title="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="sk_result"]',
            separatorReal: false,
        }
    },
    {name: '������',
        url: /^http:\/\/(list|so)\.iqiyi\.com\//i,
        nextLink: '//div[@class="page"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="list_content"]/div[@class="list0"] | //div[@class="s_main"]/descendant::div[@class="mod_sideright clearfix"]/ul',
        }
    },
    {name: '������ - ȫ����Ƶ',
        url: /^http:\/\/www\.tudou\.com\/cate\/.*\.html/i,
        exampleUrl: 'http://www.tudou.com/cate/ach30.html',
        nextLink: '//div[@class="page-nav-bar"]/a[text()="��һҳ>"]',
        autopager: {
            pageElement: '//div[@class="content"]',
        }
    },
    {name: '�Ѻ���Ƶ ����',
        url: /^http:\/\/so\.tv\.sohu\.com\/mts\?&wd=/i,
        exampleUrl: 'http://so.tv.sohu.com/mts?&wd=%u6211%u662F%u7279%u79CD%u5175%u4E4B%u706B%u51E4%u51F0',
        nextLink: '//div[@class="page"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="listBox clear"]/div[@class="column picList"]',
        }
    },
    {name: '�Ѻ���Ƶ',
        url: /^http:\/\/so\.tv\.sohu\.com\/list/i,
        exampleUrl: 'http://so.tv.sohu.com/list_p1169_p2_u4E16_u754C_u676F_p3_p4_p5_p6_p7_p8_p9_p10_p11.html',
        nextLink: '//div[@class="page"]/a[@class="next"]',
        autopager: {
            pageElement: 'id("contentList")/div[@class="column-bd clear"]/ul[@class="cfix"]',
            replaceE: 'id("contentList")/div[@class="page"]',
        }
    },
    {name: 'bilibili',
        "url": "^http://(www\\.bilibili\\.tv/search|space\\.bilibili\\.tv/)",
        "nextLink": "//div[@class=\"pagelistbox\"]/a[@class=\"nextPage\"]|//ul[@class=\"page\"]/li[@class=\"current\"]/following-sibling::li[1]/a",
        "pageElement": "//div[@class=\"searchlist\"]/ul[@class=\"search_result\"]/li|//div[@class=\"main_list\"]/ul/li"
    },
    {name: 'youtube �����б�',
        url: /^https?:\/\/www\.youtube\.com\/results/i,
        nextLink: '//div[contains(concat(" ", @class, " "), " yt-uix-pager ")]//a[last()][@href]',
        autopager: {
            pageElement: 'id("results")',
            lazyImgSrc: 'data-thumb'
        }
    },
    {name: 'imdb',
        url: /^http:\/\/www\.imdb\.com\/search/i,
        exampleUrl: 'http://www.imdb.com/search/title?count=100&title_type=feature,tv_series&ref_=nv_ch_mm_1',
        nextLink: '//span[@class="pagination"]/a[last()] | id("right")/a[last()]',
        autopager: {
            pageElement: 'id("main")/*',
        }
    },

    // ====================== shopping������ ===========================
    {name: '�Ա�����',
        url: '^http://(?:list|s|search[^.]*)\\.taobao\\.com/search',
        nextLink: '//a[@class="page-next"]',
        autopager: {
            pageElement: '//div[@class="tb-content"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    },
    {name: "�Ա�",
        url: /^http:\/\/(?!bbs).*\.taobao\.com\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@id="J_ShopSearchResult"]/div/div[contains(@class, "shop-hesper-bd")] | id("J_ItemListsContainer")/ul[@class="item-lists"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    },
    {name: '��è - ����',
        url: '^http://list\\.tmall\\.com//?search_product\\.htm\\?',
        nextLink: '//a[@class="ui-page-next" and (text()="��һҳ>>")]',
        autopager: {
            pageElement: '//div[@id="J_ItemList"]',
            relatedObj: true,
            replaceE: '//div[@class="ui-page-wrap"]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        },
    },
    {name: '��������ҳ-�Ա���',
        url: /^http:\/\/[^.]+\.taobao\.com\/search\.htm\?/i,
        exampleUrl: 'http://jiaqibaihou.taobao.com/search.htm?spm=a1z10.3.w4002-1381691988.18.GgWBry&mid=w-1381691988-0&search=y&keyword=%BC%AA%C1%D0&pageNo=1',
        nextLink: '//a[(text()="��һҳ")][not(@class="disable")]',
        autopager: {
            pageElement: '//div[@id="J_ShopSearchResult"]/div/div[contains(@class, "shop-hesper-bd")]',
            lazyImgSrc: 'data-lazyload-src|data-ks-lazyload',
        }
    },
    {name: '�Ա���̳ ',
        url: /^http:\/\/bbs\.taobao\.com\//i,
        exampleUrl: 'http://bbs.taobao.com/catalog/thread/647133-264959947.htm?spm=0.0.0.0.Ji1u2u',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("detail")/div[@class="bbd"] | //div[@class="main-wrap"]//div[@class="bd"]/table[@class="posts"]',
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: '�����̳�',
        url: /^http:\/\/.*\.jd\.com\//i,
        exampleUrl: 'http://list.jd.com/670-686-690-0-0-0-0-0-0-0-1-1-1-1-18-1574-29455-0.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("plist")',
            useiframe: true,
            lazyImgSrc: 'data-lazyload',
        }
    },
    {name: '��������',
        url: /^http:\/\/read\.jd\.com\/.*\/.*\.html/i,
        exampleUrl: 'http://read.jd.com/16171/778043.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="mc clearfix"]',
        }
    },
    {name: '����ѷ',
        url: /^http:\/\/www\.amazon\.cn\/gp\/search\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("mainResults") | id("btfResults")',
        }
    },
    {name: '��Ѹ��',
        url: /^http:\/\/searchex\.yixun\.com\//i,
        exampleUrl: 'http://searchex.yixun.com/705798t706810-1001-/?YTAG=3.706810246020',
        nextLink: '//div[@class="sort_page_num"]/a[@title="��һҳ"]',
        autopager: {
            pageElement: '//UL[@id="itemList"]',
            lazyImgSrc: 'init_src'
        }
    },
    {name: 'ǰ������ - ����',
        url: /^http:\/\/search\.51job\.com\/jobsearch\/search_result/i,
        nextLink: '//table[@class="searchPageNav"]//td[@class="currPage"]/following-sibling::td[1]/a',
        autopager: {
            pageElement: 'id("resultList")',
        }
    },
    {name: '���˸����� | ���Լ۱���Ʒ�ͼ���Ʒ�Ƽ���',
        url: /^http:\/\/www\.qlgpy\.com\//i,
        nextLink: '//div[@class="wpagenavi"]/a[text()="��ҳ"]',
        autopager: {
            pageElement: 'id("wrapmain")//ul[starts-with(@id, "post-")]',
        }
    },
    {name: '�������̳',
        url: /^http:\/\/bbs\.miaopy\.com\//i,
        exampleUrl: 'http://bbs.miaopy.com/activity/list-3.aspx',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'css;.forumtopics-list',
            stylish: 'div.sp-separator { width: 800px !important;}'
        }
    },
    {name: '¶�����u',
        url: /^http:\/\/[a-z]+\.ruten\.com\.tw\//i,
        exampleUrl: 'http://class.ruten.com.tw/category/sub00.php?c=0019000800010001',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="searchResult"]',
        }
    },
    {name: 'Yahoo!��Ħ���u',
        url: /^https:\/\/tw\.bid\.yahoo\.com\//i,
        exampleUrl: 'https://tw.bid.yahoo.com/tw/2092076277-category-leaf.html?.r=1408853888',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("srp_sl_result")',
        }
    },
    // �ֻ������
    {name: 'ɱ�۰�3C����������ʵ �͹� ���� ����',
        url: /^http:\/\/www\.shajia\.cn\/article/i,
        exampleUrl: 'http://www.shajia.cn/article_list.php',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("agreement")',
        }
    },
    {name: '������',
        url: /^http:\/\/www\.gfan\.com\/review\/\w+\.html/,
        exampleUrl: 'http://www.gfan.com/review/2014091557751.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="news-content"]',
            relatedObj: true
        }
    },

    // ========================= ֪ʶ���Ķ� ============================
    {name: '����-��Ӱ������',
        url: '^http://.*\\.douban\\.com/subject',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[contains(text(),"��ҳ>")]',
        autopager: {
            pageElement: '//ul[contains(@class,"topic-reply")] | //div[@class="article"]/table | //div[@id="comments" or @class="post-comments"]'
        }
    },
    {name: '�ҵ�С�黰�� - ����',
        url: /^http:\/\/www\.douban\.com\/group\//i,
        exampleUrl: 'http://www.douban.com/group/',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[text()="��ҳ>"]',
        autopager: {
            pageElement: 'id("content")/div/div[@class="article"]',
        }
    },
    {name: '����ȫվ',
        url: '^http://.*\\.douban\\.com/.*',
        nextLink: '//div[@class="paginator"]/span[@class="next"]/a[contains(text(),"��ҳ>")]',
        autopager: {
            pageElement: 'id("miniblog") | //*[@class="photolst clearfix" or @class="photolst clearbox" or @class="event-photo-list" or @class="poster-col4 clearfix"] | \
            //div[@id="comment-section"] | //table[@class="olt" or @class="list-b"]/tbody | //div[contains(@class,"clearfix")]/div[@class="article"]'
        }
    },
    {name: '֪��',
        url: /^http:\/\/www\.zhihu\.com\/collection/i,
        exampleUrl: 'http://www.zhihu.com/collection/19561986',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("zh-list-answer-wrap")/div[@class="zm-item"]',
            useiframe: true,
                newIframe: true
        }
    },
    {name: '������ | ���Ŀ��ԭ�Ŀ�',
        url: /^http:\/\/(?:article|source)\.yeeyan\.org\//i,
        nextLink: '//ul[contains(concat(" ",normalize-space(@class)," "), " y_page") ]/li/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[contains(concat(" ",normalize-space(@class)," "), "content_box")] | //div[@class="y_l"]/div[@class="y_s_list"]',
            replaceE: '//ul[contains(concat(" ",normalize-space(@class)," "), " y_page") ]'
        }
    },
    {name: '���Ծ�ѡ',
        url: /^http:\/\/select\.yeeyan\.org\//i,
        nextLink: '//ul[contains(@class, "s_page_n")]/li/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("article_list")',
            replaceE: '//ul[contains(@class, "s_page_n")]'
        }
    },
    {name: ' ����С��',
        url: /^http:\/\/group\.yeeyan\.org\//i,
        nextLink: '//div[@class="paginator"]/a[@class="next"]',
        autopager: {
            pageElement: '//div[contains(@class, "column-main")]/div[contains(@class, "stream")]',
            replaceE: '//div[@class="paginator"]',
        }
    },
    {name: '����վ | ������ ',
        url: '^http://www\\.guokr\\.com/(?:site|group|ask|event)/',
        nextLink: '//ul[@class="gpages"]/li/a[contains(.,"��һҳ")]',
        pageElement: '//div[@class="article-list"] | //ul[@class="titles"] | //ul[@class="ask-list"] | //ul[@class="event_list gclear"]',
    },
    {name: '���ڵ�����',
        url: '^http://www\\.dianping\\.com/.*',
        nextLink: '//a[@class="NextPage" and @title="��һҳ" and (text()="��һҳ")]',
        pageElement: '//div[@id="searchList"]',
    },
    {name: '����һ��ɳ� | �Ҹ��������ֲ���ͬ�ɳ�����Ȧ',
        url: /^http:\/\/upwith\.me\//i,
        exampleUrl: 'http://upwith.me/',
        nextLink: '//div[@class="pagination"]/descendant::a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="content"]',
        }
    },
    {name: '֪���ձ�',
        url: '^http://zhihudaily\\.jd-app\\.com/',
        nextLink: '//h3/a[text()="<<< ǰһ��"]',
        autopager: {
            pageElement: 'css;body > *',
            separatorReal: false,
        },
        exampleUrl: 'http://zhihudaily.jd-app.com/',
    },

    // ========================= download ===========================
    {name: 'VeryCD����ҳ��',
        url: /http:\/\/www\.verycd\.com\/search\/folders.+/i,
        siteExample: 'http://www.verycd.com/search/folders/',
        nextLink: '//ul[@class="page"]//a[contains(text(),"��һҳ")][@href]',
        autopager: {
            pageElement: '//ul[@id="resultsContainer"]',
            replaceE: 'id("page_html")/ul[@class="page"]',
            lazyImgSrc: '_src'
        }
    },
    {name: "VeryCD������Դҳ",
        url: /^http:\/\/www\.verycd\.com\/sto\/.+/i,
        exampleUrl: "http://www.verycd.com/sto/music/page1",
        nextLink: '//div[@class="pages-nav"]/a[text()="��һҳ ?"]',
        autopager: {
            pageElement: '//div[@id="content"]/ul',
            lazyImgSrc: 'load-src',
            replaceE: '//div[@class="pages-nav"]'
        }
    },
    {name: 'SimpleCD | �ñ�ǽ��ü�',
        url: /^http:\/\/www\.simplecd\.me\//i,
        exampleUrl: 'http://www.simplecd.me/search/entry/?query=%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B',
        nextLink: '//td[@class="next"]/a[@class="enabled"]',
        autopager: {
            pageElement: '//div[@class="result-list" or @class="sub-recommend"]/div[@class="content"]',
        }
    },
    {name: '��¿վ ������ iCiLi - ��¿����վ',
        url: /^http:\/\/www\.icili\.com\/emule/i,
        exampleUrl: 'http://www.icili.com/emule',
        nextLink: 'id("main")/div[@class="pager"]/descendant::a[text()=" > "]',
        autopager: {
            pageElement: 'id("main")/ul',
            replaceE: 'id("main")/div[@class="pager"]'
        }
    },
    {name: '������',
        url: /^http:\/\/(?:www\.)?shooter\.cn\/search\//i,
        exampleUrl: 'http://www.shooter.cn/search/Elysium/',
        preLink:{
            startAfter:'?page=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?page=',
            mFails:[/^http:\/\/(?:www\.)?shooter\.cn\/search\/[^\/]+/i,'?page=1'],
            inc:1,
        },
        autopager: {
            pageElement: '//div[@id="resultsdiv"]/div[@class="subitem"]',
        }
    },
    {name: "YYeTs ����Ӱ��",
        url: "^http://www\\.yyets\\.com/",
        nextLink: "//div[starts-with(@class, 'pages')]/descendant::a[text()='��һҳ'] | //div[@class='pages']//a[@class='cur']/following-sibling::a",
        autopager: {
            pageElement: "//div[@class='box_1 topicList'] | //div[@class='box_4 res_listview' or @class='box_4 bg_eb'] | //ul[@class='u_d_list']/li | //ul[@class='allsearch dashed boxPadd6' or @class='dashed bbs_info_list']",
            replaceE: '//div[@class="pages" or @class="pages clearfix"]',
            separatorReal: false
        }
    },
    {name: 'TTmeiju.Com ���ĸ�������ƬԴ��������',
        url: /^http:\/\/www\.ttmeiju\.com\//i,
        exampleUrl: 'http://www.ttmeiju.com/meiju/Person.of.Interest.html?page=1',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="seedlistdiv" or @class="contentbox"]/table[@class="seedtable"]',
        }
    },
    {name: '��Ӱ����',
        url: /^http:\/\/www\.dy2018\.com\//i,
        exampleUrl: 'http://www.dy2018.com/html/gndy/dyzz/index.html',
        nextLink: '//div[@class="x"]/descendant::a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="co_area2"]/div[@class="co_content8"]',
        }
    },
    {name: '���µ�Ӱ | ������',
        url: /^http:\/\/www\.longbuluo\.com\//i,
        exampleUrl: 'http://www.longbuluo.com/category/movie',
        nextLink: '//div[@class="pagebar"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="postlist"]',
            replaceE: "css;.pagebar"
        }
    },
    {name: '���������� | һ�����ذ�',
        url: /^http:\/\/17down\.net\/category/i,
        exampleUrl: 'http://17down.net/category/tv',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("content")/div[starts-with(@class, "entry_box")]',
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: 'Go����',
        url: /^http:\/\/goxiazai\.cc\//i,
        exampleUrl: 'http://goxiazai.cc/',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("main")/div[@class="post"]',
            replaceE: 'id("pagenavi")'
        }
    },
    {name: '720P��Ӱ����,1080P��Ӱ����,bt�����Ӱ����,BTԭ�̵�Ӱ���أ�BT֮�����Ƶ�Ӱ������վ�������û�ѡ��������',
        url: /^http:\/\/bbs\.1lou\.com\//i,
        exampleUrl: 'http://bbs.1lou.com/forum-index-fid-1183.htm',
        nextLink: '//div[@class="page"]/a[text()="?"]',
        autopager: {
            pageElement: 'id("threadlist") | id("body")/div/table[@class="post_table"]',
        }
    },
    {name: '��BT��Ӱ����',
        url: /^http:\/\/henbt\.com\//i,
        exampleUrl: 'http://henbt.com/',
        nextLink: '//div[@class="pages clear"]/a[@class="nextprev"]',
        autopager: {
            pageElement: 'id("btm")/div[@class="main"]/div[@class="box clear"]',
            separatorReal: false,
        }
    },
    // ================== PT ==============================
    {name: '�⻪��cmct��chd���ʺ�hd86��khdbits��hdsky��hdvnbits��hd-sportbits��tccf���ʺ�mv��mt��hd4fans��hdhc�������ѣ�tlfbits��joyhd������pt����Ӱpt�������ˣ�u2',
        url: /^https?:\/\/(?:bt\.upc\.edu|hdcmct|chdbits|open|hd86|khdbits|hdsky|hdvnbits|hd-sportbits|et8|mv\.open|tp\.m-team|www\.hd4fans|www\.hdhc|www\.pt|pt\.eastgame|www\.joyhd|ipv6\.antsoul|ipv4\.antsoul|pt\.hit\.edu|bt\.byr|u2\.dmhy)\.(net|cn|org|com|cd|cc|me|cm)\//i,
        exampleUrl: 'http://hdcmct.org/torrents.php',
        nextLink: '//b[@title="Alt+Pagedown"]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    },
    {name: '���� :: ����',
        url: /^https:\/\/pt\.sjtu\.edu\.cn\/torrents\.php/i,
        exampleUrl: 'https://pt.sjtu.edu.cn/torrents.php',
        nextLink: '//b[contains(text(), "��һҳ")]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    },
    {name: '- HDWinG ����Ӱ����ʿ�ķ�����԰',
        url: /^https?:\/\/hdwing\.com\/browse\.php/i,
        exampleUrl: 'http://hdwing.com/browse.php',
        nextLink: '//b[contains(text(), "��ҳ")]/parent::a',
        autopager: {
            pageElement: '//table[@class="torrents_list"]',
        }
    },
    {name: 'TTG',
        url: /^http:\/\/ttg\.im\/browse\.php/i,
        exampleUrl: 'http://ttg.im/browse.php',
        nextLink: '//b[contains(text(), "��ҳ")]/parent::a',
        autopager: {
        pageElement: 'id("torrent_table")',
        }
    },
    {name: '����',
        url: /^http:\/\/pt\.nwsuaf6\.edu\.cn\/torrents\.php/i,
        exampleUrl: 'http://hdcmct.org/torrents.php',
        nextLink: '//b[contains(text(), "��һҳ")]/parent::a[@class="next"]',
        autopager: {
            pageElement: '//table[@class="torrents"]',
        }
    },
    {name: '�ֺ���-���ֺ���',
        url: '^http://www\\.ulehu\\.com/',
        nextLink: '//a[@class="a1" and (text()="��һҳ")]',
        pageElement: '//body/div[@class="container mt20"]/div[@class="content"]/div[@class="colMain"]/div',
        exampleUrl: 'http://www.ulehu.com/',
    },
    {name: 'HDRoad - ��Դ��',
        url: /^http:\/\/hdroad\.org\/browse\.php/i,
        exampleUrl: 'http://hdroad.org/browse.php',
        nextLink: '//a[contains(text(), "��һҳ")]',
        autopager: {
            pageElement: '//div[@id="torrent-list"]',
        }
    },
    {name: '�����б�-������ͨ��ѧ֪��PT',
        url: '^http://pt\\.zhixing\\.bjtu\\.edu\\.cn/search/',
        nextLink: '//a[@class="next"]',
        pageElement: '//table[@class="torrenttable"]',
        exampleUrl: 'http://pt.zhixing.bjtu.edu.cn/search/',
    },
    {name: '�Ͼ�վ | ZiJingBT v2 | ����ҳ',
        url: /^http:\/\/zijingbt\.njuftp\.org\//i,
        exampleUrl: 'http://zijingbt.njuftp.org/index.html',
        nextLink: '//a[contains(text(), "��һҳ")]',
        autopager: {
            pageElement: '//table[@class="torrent_table"]',
        }
    },

    // ========================= bbs��blog ======================
    {name: '������̳_�����б�',
        url: '^http://bbs\\.tianya\\.cn/list',
        nextLink: '//a[text()="��һҳ"]',
        pageElement: '//div[@class="mt5"]',
    },
    {name: '������̳����',
        url:/http:\/\/bbs\.tianya\.cn\/.+\.shtml/i,
        siteExample:'http://bbs.tianya.cn/post-feeling-2792523-1.shtml',
        nextLink:'//div[@class="atl-pages"]/descendant::a[text()="��ҳ"][@href]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="atl-main"]',
            lazyImgSrc: 'original',
            filter: function(pages){
                var see_only_uname = unsafeWindow.see_only_uname;
                var setOnlyUser = unsafeWindow.setOnlyUser;
                if(see_only_uname){
                    setOnlyUser(see_only_uname);
                }
            }
        }
    },
    {name: 'mozest����',
        url: /^https?:\/\/g\.mozest\.com/i,
        nextLink: '//div[@class="pages"]//a[@class="next"]',
        autopager: {
            pageElement: '//div[@id="threadlist"] | //div[@id="postlist"]',
            useiframe: true,
            replaceE: 'css;.pages_btns > .pages'
        }
    },
    {name: 'Firefox�������� - �б�',
        url: '^https?://www\\.firefox\\.net\\.cn/thread',
        nextLink: '//div[@class="pages"]/a[contains(text(), "��һҳ")]',
        autopager: {
            pageElement: 'id("J_posts_list")',
            replaceE: 'css;.pages',
            documentFilter: function(doc) {
                // ͷ��������������
                [].forEach.call(doc.querySelectorAll('img.J_avatar'), function(img){
                    img.setAttribute('onerror', 'this.src="http://www.firefox.net.cn/res/images/face/face_small.jpg";');
                });
            }
        }
    },
    {name: 'Firefox�������� - ����',
        url: '^https?://www\\.firefox\\.net\\.cn/read',
        nextLink: '//div[@class="pages"]/a[contains(text(), "��һҳ")]',
        autopager: {
            pageElement: 'id("J_posts_list")/*',
            useiframe: true,
                newIframe: true
        }
    },
    {name: 'Mozilla Addons - �û���Ϣ',
        url: /^https:\/\/addons\.mozilla\.org\/zh-CN\/[^\/]+\/user\//i,
        exampleUrl: 'https://addons.mozilla.org/zh-CN/firefox/user/Vasiliy_Temnikov/',
        nextLink: '//p[@class="rel"]/a[@class="button next"]',
        autopager: {
            pageElement: 'id("my-addons")',
            relatedObj: true,
        }
    },
    {name: 'Mozilla Addons',
        url: /^https?:\/\/addons\.mozilla\.org\/[^\/]+\/firefox/i,
        siteExample: 'https://addons.mozilla.org/zh-CN/firefox/',
        nextLink: '//p[@class="rel"]/a[@class="button next"][@href] | //ol[@class="pagination"]/li/a[@rel="next"][@href]',
        autopager: {

            pageElement: '//div[@id="pjax-results" or @class="separated-listing"]/div[@class="items"] | //section[@class="primary"]/div/div[@class="items"] | //ul[@class="personas-grid"] | //div[@id="my-addons"] | //div[@id="reviews"]',
            relatedObj: true,
            replaceE: 'css;.paginator'
        }
    },
    {name: '���� | Mozilla ����֧��',
        url: '^https://support\\.mozilla\\.org/zh-CN/search\\?',
        exampleUrl: 'https://support.mozilla.org/zh-CN/search?esab=a&product=firefox&q=%E7%BE%A4%E7%BB%84',
        nextLink: '//a[@class="btn-page btn-page-next" and contains(text(),"��һ��")]',
        autopager: {
            pageElement: '//div[@id="search-results"]/div[@class="grid_9"]/div[@class="content-box"]',
        }
    },
    {name: '���������-�������',
        url: "^http://extension\\.maxthon\\.cn/",
        nextLink: '//div[@class="pages page-right"]/a[text()=">"]',
        pageElement: '//ul[@id="delegate-all"]'
    },
    {name: "С���ֻ��ٷ���̳",
        url: "^http://bbs\\.xiaomi\\.cn/",
        nextLink: "//a[@class='nxt' and (text()='��һҳ')]",
        autopager: {
            pageElement: "id('postlist') | id('threadlist')",
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
            documentFilter: function(doc) {
                var firstDiv = doc.querySelector("div[id^='post_']");
                if (firstDiv) {
                    firstDiv.parentNode.removeChild(firstDiv);
                }
            }
        }
    },
    {name: '���Ѽ�԰',
        url: /^http:\/\/www\.weiqitv\.com\/home\/forum/i,
        exampleUrl: 'http://www.weiqitv.com/home/forum.php?mod=viewthread&tid=1623&extra=&page=1',
        nextLink: '//div[@class="pg"]/a[@class="nxt"]',
        autopager: {
            pageElement: 'id("threadlisttableid") | id("postlist")',
            useiframe: true,
        }
    },
    {name: 'Discuz X2.5�޸�',
        url:/^http?:\/\/(bbs.gfan|bbs.xda|bbs.weiphone|bbs.feng|www.weiqitv|www.diypda|f.ppxclub|bbs.sd001|bbs.itiankong)\.(com|cn)/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="threadlist"] | //div[@id="postlist"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
        }
    },
    {name: '������̳����',
        url: /^http:\/\/s\.feng\.com\/f\?srchtxt=/i,
        nextLink: '//div[@class="pages"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@id="searchresult"]',
            replaceE: '//div[@class="pages"]'
        }
    },
    {name: 'Discuz ҳ����ת�޸�',
        url:/^http:\/\/(bbs.pcbeta|bbs.besgold|www.pt80)\.(com|net)/i,
        nextLink:'//div[@class="pg"]/descendant::a[@class="nxt"]',
        autopager:{
            pageElement:'//div[@id="postlist"] | //form[@id="moderate"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]',
        }
    },
    {name: 'vBulletin��̳ �Ӽ�/��ѩ/XDA',
        url:/http:\/\/(bbs|forum)\.(jjol|pediy|xda-developers)\.(cn|com)\/(forumdisplay|showthread)/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="posts"]/div[@align="center"] | //table[@class="tborder"][@id="threadslist"]',
        }
    },
    {name: 'xda-developers',
        url: "^http://forum\\.xda-developers\\.com/",
        nextLink: "//td[@class='alt1']/a[@rel='next']",
        autopager: {
            pageElement: "//table[@id='threadslist'] | //div[@id='posts']",
            replaceE: "//div[@class='pagenav']/table[@class='pagenavControls']",
            separatorReal: false
        }
    },
    {name: '���Ȧ',
        url: /^http:\/\/www\.wanjiquan\.com\//i,
        exampleUrl: 'http://www.wanjiquan.com/forum-169-1.html',
        nextLink: 'css;.ma_tiezi_list_page > .next',
        autopager: {
            pageElement: '//form[@id="moderate"] | id("postlist")',
        }
    },
    {name: '��������',
        url: '^http://bbs\\.themex\\.net/',
        nextLink: '//a[@rel="next"]',
        pageElement: 'id("threadslist posts")',
    },
    {name: '��̳',
        url:/http:\/\/bbs\.waptw\.com/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]',
        }
    },
    {name: '��Ѫ����',
        url:/^http:\/\/bbs\.tiexue\.net\/.*\.html$/i,
        nextLink:'//div[@class="pages"]/span/a[text()=">>"]',
        autopager:{
            pageElement:'//div[@class="posts_list"]',
        }
    },
    {name: '��Ѫ��',
        url:/http:\/\/[a-z]+\.tiexue\.net/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="fontListBox"]',
        }
    },
    {name: '������̳ - �����б�',
        url:/http:\/\/bbs\.crsky\.com\/read\.php/i,
        nextLink:'//div[@class="pages"]//a[text()=">"]',
        autopager:{
            // useiframe:true,
            pageElement:'//div[@class="t5 t2"]',
        }
    },
    {name: '����������̳',
        url: /^http:\/\/bbs\.hupu\.com\//i,
        exampleUrl: 'http://bbs.hupu.com/8173461.html',
        nextLink: 'id("j_next")',
        autopager: {
            pageElement: '//div[@id="t_main"]/div[@class="floor"] | //table[@id="pl"]',
            replaceE: 'css;.page'
        }
    },
    {name: '�˴󾭼���̳',
        url:/http:\/\/bbs\.pinggu\.org\/thread/i,
        siteExample:'http://bbs.pinggu.org/thread-1562552-3-1.html',
        nextLink:'//div[@id="pgt"]/descendant::a[@class="nxt"]',
        autopager:{
            pageElement:'//div[@id="postlist"]',
        }
    },
    {name: '��β��',
        url:/joowii\.com\/arc/i,
        siteExample:'http://www.joowii.com/arc/ysyl/ssgx/2012/0905/125571.html',
        nextLink:'auto;',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="article"]',
        }
    },
    {name: '17173.com�й���Ϸ��һ�Ż�վ',
        url: '^http://news\\.17173\\.com/content/.*\\.shtml',
        nextLink: '//a[@class="page-next"]',
        pageElement: '//div[@id="matterc"]',
    },
    {name: '������',
        url: /^http:\/\/(?:www|down)\.ali213\.net\//i,
        exampleUrl: 'http://www.ali213.net/news/html/2013-12/91377.html',
        nextLink: 'auto;',
        // nextLink: '//a[@id="after_this_page"][@href] | //div[@class="p_bar"]/a[text()="��ҳ"] | //div[@class="list_body_page"]/a[@title="��һҳ"]',
        autopager: {
            pageElement: '//div[@id="Content" or @id="game_content" or @id="rqjxhb"]',
            relatedObj: true,
            lazyImgSrc: 'data-original'
        }
    },
    {name: '�����ǿ�',
        url:/http:\/\/www\.gamersky\.com/i,
        siteExample:'http://www.gamersky.com/news/201207/206490.shtml',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="act mid"]',
            relatedObj: true
        }
    },
    {name: '3DMGAME',
        url:/http:\/\/www\.3dmgame\.com\/.*\.html/i,
        siteExample:'http://www.3dmgame.com/news/201312/2310792.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="QZmainL"]/div/div[contains(@class, "con")]',
            relatedObj: true,
        }
    },
    {name: '�ﵺ��̳',
        url:/^http:\/\/bbs\.houdao\.com/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="z threadCommon"] | //div[@class="mb10 bodd"]',
        }
    },
    {name: '178 ħ�����硢178����Ƶ��',
        url: /^http:\/\/[a-z]+\.178\.com\/.*\.html/i,
        exampleUrl: 'http://wow.178.com/201308/170546277543.html',
        nextLink: 'id("cms_page_next")',
        autopager: {
            pageElement: '//div[@id="text"]',
            replaceE: '//div[@class="page"]',
            relatedObj: true
        }
    },
    {name: '��İ��',
        url:/http:\/\/www\.1000qm\.com\/(?:thread\.php\?fid\-\d+|read\.php\?tid\-\d+)\.html/i,
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="z threadCommon"] | //div[@id="pw_content"][@class="mb10"]',
        }
    },
    {name: '�嵰��ҳ',
        url:/http:\/\/jandan\.net\/(?:page)?/i,
        siteExample:'http://jandan.net/',
        useiframe:true,
        nextLink:'//div[@class="wp-pagenavi"]/child::a[text()=">"] | //p[@class="cp-pagenavi"]/a[text()="?"]',
        autopager:{
           pageElement:'//div[@id="content"] | id("comments")'
        }
    },
    {name: '������',
        url:/http:\/\/qicai\.fengniao\.com\/\d+\/\d+.html/i,
        siteExample:'http://qicai.fengniao.com/370/3705137.html',
        useiframe:true,
        nextLink:'auto;',
        autopager:{
            remain:1/3,
            relatedObj:['css;div.page_num','bottom'],
            pageElement:'//div[@class="article"]',
        }
    },
    {name: '55188��̳',
        url:/http:\/\/www\.55188\.com/i,
        siteExample:'http://www.55188.com/forum-8-1.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="mainbox threadlist"] | //div[@class="mainbox viewthread"]',
        }
    },
    {name: 'PCHOME ����',
        url:/http:\/\/club\.pchome\.net/i,
        siteExample:'http://club.pchome.net/forum_1_15.html#',
        nextLink:'auto;',
        autopager:{
             pageElement:'//form[@id="mytopics"] | //div[@id="weibo_app"]',
        }
    },
    {name: 'pconline',
        url: '^http://[a-z]+\\.pconline\\.com\\.cn/',
        nextLink: '//div[contains(@class, "pconline_page") or contains(@class, "pager")]/a[@class="next"]',
        autopager: {
            pageElement: '//div[@id="article"]//div[@class="content"] | //ul[@id="ulHoverPic"] | //table[@class="posts"] | id("post_list") | id("topicList")',
            relatedObj: true,
            replaceE: 'css;.pconline_page',
        },
        exampleUrl: 'http://diy.pconline.com.cn/377/3774616.html',
    },
    {name: 'Chiphell',
        url: /^http:\/\/www\.chiphell\.com\/(?!forum)/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("ct")/div[@class="mn"]/div[@class="bm"]/div[@class="bm_c xld"] | id("article_content")/../..',
            replaceE: '//div[@class="pg"]',
        }
    },
    {name: '���°ٿ�',
        url: '^http://www\\.qiushibaike\\.com/',
        nextLink: '//a[@class="next" and @title="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="main"]/div[contains(@class, "content-block")]/div[@class="col1"]',
            stylish: '.sp-separator { width: 620px !important; }'
        }
    },
    {name: '�������Ȱ�',
        url: /^http:\/\/dig\.chouti\.com\//i,
        nextLink: '//a[@class="ct_page_edge" and (text()="��һҳ")]',
        autopager: {
            pageElement: '//div[@id="content-list"]',
            lazyImgSrc: 'original',
            filter: function(pages){
                var chouti = unsafeWindow.chouti;
                var NS_links_comment_top = unsafeWindow.NS_links_comment_top;
                chouti.vote();
                chouti.addCollect();
                chouti.shareweibo();
                chouti.playVido();
                NS_links_comment_top.init();
            }
        }
    },
    {name: 'è�˴��ӻ�����',
        url:/http:\/\/dzh\.mop\.com\/topic\/readSub/i,
        nextLink:'//a[contains(text(),"��һҳ")][@href]',
        autopager:{
            pageElement:'//div[@class="huitie"]',
        }
    },
    {name: 'è�����롢è��������',
        url: /^http:\/\/(?!dzh).*\.mop\.com\/.*\.shtml/i,
        exampleUrl: 'http://digi.mop.com/sjsj/140522002176016.shtml',
        nextLink: 'id("nextp") | id("page_use")/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@id="article"] | //div[@class="content"]/div[@class="inner"]/div[@class="nr_con"]',
                replaceE: '//div[@class="page"]',
            relatedObj: true,
        }
    },
    {name: 'ɫӰ�޼�����',
        url:/http:\/\/forum\.xitek\.com\/showthread/i,
        siteExample:'http://forum.xitek.com/showthread.php?threadid=571986',
        nextLink:'//font[@size="2"]/font[@class="thtcolor"]/following-sibling::a[@href]',
        autopager:{
            pageElement:'//body/table[position()>2 and position()<(last()-2)]',
        }
    },
    {name: '19¥����',
        url:/^http:\/\/www\.19lou\.com/i,
        siteExample:'http://www.19lou.com/forum-1502-thread-29762777-1-1.html',
        nextLink:'auto;',
        useiframe:true,
        autopager:{
            useiframe:true,
            pageElement:'//form[@name="postForm"] | //form[@name="manageForm"]',
        }
    },
    {name: 'blogspot',
        url: '^http://[^./]+\\.(blogspot|playpcesor)(?:\\.[^./]{2,3}){1,2}/(?!\\d{4}/)',
        exampleUrl: 'http://program-think.blogspot.com/  http://www.playpcesor.com/',
        nextLink: '//a[contains(concat(" ", @class, " "), " blog-pager-older-link ")]',
        autopager: {
            pageElement: '//div[contains(concat(" ", @class, " "), " hfeed ") or contains(concat(" ", @class, " "), " blog-posts ")] | id("Blog1")/div[contains(concat(" ", @class, " "), " entry ")]',
            relatedObj: true,
            replaceE: "css;#blog-pager"            }
    },
    {name: '����365��',
        url: /^http:\/\/[a-z]+\.beihai365\.com\//i,
        exampleUrl: 'http://kj.beihai365.com/',
        nextLink: '//div[@class="pages"]/*[contains(concat(" ",normalize-space(@class)," "), " active ")]/following-sibling::a[1]',
        autopager: {
            pageElement: 'id("threadlist")/tr[@class="tr3"] | id("pw_content")//form[@method="post" and @name="delatc"]',
            replaceE: '//div[@class="pages"]',
        }
    },
    {name: 'gelbooru, safebooru etc',
        url: '^http://(?:www\\.)?\\w{3,4}booru\\.(?:com|org)',
        nextLink: 'id("paginator")//b/following-sibling::a[1]',
        pageElement: 'id("post-list")/div[@class="content"]//span[contains(@class,"thumb")]|id("content")/table',
        exampleUrl: 'http://gelbooru.com/index.php?page=post&s=list http://safebooru.org/index.php?page=post&s=list&tags=all http://safebooru.org/index.php?page=tags&s=list'
    },
    {name: '�������̳ ȫ��������Ķ�����̳',
        url: /^http:\/\/www\.erji\.net\//i,
        exampleUrl: 'http://www.erji.net/thread.php?fid=138',
        nextLink: '//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)]',
        autopager: {
            pageElement: '//table[@id="ajaxtable"] | //div[@id="main"]/form[@method="post"]',
            replaceE: '//div[@class="pages"]'
        }
    },
    {name: '������˹���ҵ�����̳',
        url: /^http:\/\/(?:bbs\.ngacn\.cc|nga\.178\.com)\//i,
        exampleUrl: 'http://bbs.ngacn.cc/thread.php?fid=390&rand=183',
        nextLink: '//a[@title="��һҳ"][@href]',
        autopager: {
            pageElement: 'id("topicrows") | id("m_posts_c")',
            useiframe: true,
            separatorReal: false,
        }
    },
    {name: 'Final Fantasy Shrine Forums',
        url: /^http:\/\/forums\.ffshrine\.org\//i,
        exampleUrl: 'http://forums.ffshrine.org/general-discussion/',
        nextLink: '//a[@rel="next"][@href]',
        autopager: {
            pageElement: 'id("thread_inlinemod_form") | id("postlist")',
        }
    },
    {name: '��èħ����̳',
        url: '^http://www\\.znds\\.com/*',
        nextLink: '//a[contains(text(), "��һҳ")]',
        pageElement: 'id("threadlist")/div[@class="bm_c"]',
        exampleUrl: 'http://www.znds.com/bbs-172-3.html',
    },
    {name: 'Mobile01',
        url: /^http:\/\/www\.mobile01\.com\/topicdetail\.php.*$/i,
        exampleUrl: 'http://www.mobile01.com/topicdetail.php?f=254&t=3966939',
        nextLink: '//a[contains(text(), "��һ�")]',
        autopager: {
            pageElement: 'id("section")/div[@class="main"]/div[@class="forum-content"]',
        }
    },
    {name: '���� - ��Դ/����',
        url: '^http://bbs\\.ikunlun\\.net/forum\\.php.*$',
        nextLink: '//a[@class="now"]/following-sibling::a[1][not(@class="last") ]',
        pageElement: '//tr[@class="topic_list_row"]',
    },

    // ========================= picture ================================================
    {name: 'Flickr����',
        url:/http:\/\/www\.flickr\.com\/search\/\?q=/i,
        siteExample:'http://www.flickr.com/search/?q=opera',
        nextLink:'//div[@class="Paginator"]/a[@class="Next"][@href]',
        autopager:{
            pageElement:'//div[@id="ResultsThumbsDiv"]',
            replaceE:'//div[@class="Paginator"]',
        }
    },
    {name: 'Flickr photos',
        "url": "^http://www\\.flickr\\.com/photos/[^/]+/favorites(?:[/?#]|$)",
        "nextLink": "id(\"paginator-module\")/descendant::a[contains(concat(\" \", @class, \" \"), \" Next \")]",
        "pageElement": "id(\"faves\")",
        "insertBefore": "//div[@class=\"Pages\"]"
    },
    {name: 'pixiv',
        url:/http:\/\/www\.pixiv\.net\//i,
        siteExample:'http://www.pixiv.net/search.php?s_mode=s_tag_full&word=%E8%85%90 or http://www.pixiv.net/novel/ranking.php',
        nextLink:'//*[@class="next"]/a[@rel="next"][@href]',
        autopager:{
            pageElement:'//ul[contains(@class, "autopagerize_page_element")] | //section[contains(@class, "autopagerize-page-element")] | //div[@class="column-content"]/ul[contains(@class, "tag-list")]',
            relatedObj: true,
            replaceE: 'css;.pager-container > .page-list'
        }
    },
    {name: '��Ƭ������',
        url:/http:\/\/www\.photops\.com\/Article\/.+/i,
        siteExample:'http://www.photops.com/Article/xsjc/20100728172116.html',
        nextLink:'//a[text()="��һҳ"][@href]',
        autopager:{
            pageElement:'//body/table[last()-2]',
            useiframe:true,
        }
    },
    {name: '�˼Һ���ƽ̨',
        url:/^http:\/\/www\.pujiahh\.com\/library/i,
        siteExample:'http://www.pujiahh.com/library/',
        nextLink:'//div[@class="pagination"]/ul/li[@class="next-posts"]/a',
        autopager:{
            pageElement:'//div[@class="gametable"]/parent::div',
            replaceE: '//div[@class="pagination"]'
        }
    },
    // === art
    {name: 'deviantART Gallery',
        url: /^https?:\/\/\w+\.deviantart\.com\/gallery\//i,
        exampleUrl: 'https://razielmb.deviantart.com/gallery/',
        nextLink: '//li[@class="next"]/a',
        autopager: {
            pageElement: 'css;#gmi-ResourceStream',
            relatedObj: true
        }
    },
    // === mm ===
    {name: 'Show����',
        url:/^http:\/\/www\.showmeizi\.com\/\w+\/\d+/i,
        siteExample:'http://www.showmeizi.com/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="post image"]/div[@class="main-body"]',
        }
    },
    {name: 'Beautyleg��ģд��ͼƬ��',
        url:/^http:\/\/www\.beautylegmm\.com\/\w+\/beautyleg-\d+.html/i,
        siteExample:'http://www.beautylegmm.com/x/beautyleg-x.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'id("contents_post")/div[@class="post"]',
        }
    },
    {name: 'Rosi��Ůͼ',
        url:/^http:\/\/www\.rosiyy\.com\/.*.html/i,
        siteExample:'http://www.rosiyy.com/x/x.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="clearfix"]/div[@class="grid_10"]/div[@class="post postimg"]/p/a',
        }
    },
    {name: '7160��ŮͼƬ',
        url: '^http://www\\.7160\\.com/*/*/',
        nextLink: '//a[text()="��һҳ"]',
        pageElement: 'id("arc")/div/div/div/a/img',
        exampleUrl: 'http://www.7160.com/meinv/11988/',
    },
    {name: '������ͼ��|7lili.com',
        url: '^http://www\\.7lili\\.com/.+/.+/.+/.+\\.html',
        nextLink: '//a[text()="��һҳ"]',
        pageElement: '//div/div/div/a/img',
        exampleUrl: 'http://www.7lili.com/p/xinggan/201403/30333.html',
    },
    {name: '��Ʒ���ð�',
        url: '^http://www\\.jpmm8\\.com/html/*/',
        nextLink: '//a[text()="��һҳ"]',
        pageElement: '//div/div/div/a/img',
        exampleUrl: 'http://www.jpmm8.com/html/wlmm/12163.html',
    },
    {name: '������',
        url: '^http://tuku\\.mingxing\\.com/*',
        nextLink: '//a[@title="��һҳ"]',
        pageElement: '//div/div/div/div/p/a/img',
        exampleUrl: 'http://tuku.mingxing.com/xiezhen/30820/1.html',
    },
    {name: 'kdsģ�ش�Ӫ',
        url: '^http://model\\.kdslife\\.com/show/photo/*',
        nextLink: '//a[contains(text(), "��һ��")]',
        pageElement: 'id("mainPic")',
        exampleUrl: 'http://model.kdslife.com/show/photo/20256.html',
    },
    	{
		name: '[LEGBABY] ��������˿����ģ���񲨰����������� NO.016(��1ҳ)',
		url: '^http:\\/\\/www\\.aitaotu\\.com\\/guonei\\/\\d+\\.html',
		nextLink: 'id("nl")/a',
		pageElement: '//div/div/div/div/p[@align="center"]/a',
		exampleUrl: 'http://www.aitaotu.com/guonei/24869.html',
	},
	{
		name: '�̷���Ů�����տ���������ɳ���Ϻ�˿�ջ�(2/45)_��Ů86',
		url: '^http://www\\.17786\\.com\\/\\d+_\\d+\\.html',
		nextLink: '//div/div/div/a[@class="next-page-a"]',
		pageElement: '//div[@class="falls-detail"]/div[@class="content"]/div[@class="img_box"]/a/img[@class="IMG_show"]',
		exampleUrl: 'http://www.17786.com/8104_2.html',
	},
	{
		name: '���ɶ�Faye- [XIUREN������] 2016.04.21 ��÷���������һ��-��ŮͼƬ_լ��Ů��',
		url: '^http://www\\.zngirls\\.com\\/.\\/\\d+\\/',
		nextLink: 'id("pages")/a[text()="��һҳ"]',
		pageElement: 'id("hgallery")/img',
		exampleUrl: 'http://www.zngirls.com/g/17951/',
	},
	{
		name: '���ɶ�Faye- [XIUREN������] 2016.04.21 ��÷���������һ��-��ŮͼƬ_լ��Ů��',
		url: '^https://www\\.nvshens\\.com\\/.\\/\\d+\\/',
		nextLink: 'id("pages")/a[text()="��һҳ"]',
		pageElement: 'id("hgallery")/img',
		exampleUrl: 'http://www.nvshens.com/g/17951/',
	},
	{name: 'AV�ٿ�',
		url: '^http://www\\.avbaike\\.net/\\d+\\.html',
		nextLink: 'id("content")/div[@class="article_container row  box"]/div[@class="context"]/descendant::a[text()="��һҳ"]',
		pageElement: '//div[@id="post_content"]',
		exampleUrl: 'http://www.avbaike.net/17237.html',
	},
	{name: '����ͼ',
		url: '^https://www\\.aitaotu\\.com/[a-z]+/\\d+(_\\d)*\\.html',
		nextLink: '//a[text()="��һҳ"]',
		pageElement: 'id("big-pic")/p/a',
		exampleUrl: 'https://www.aitaotu.com/guonei/1081_4.html',
	},
	{name: '���������Ŵ�ȫ',
		url: '^http://www\\.bfpgf\\.com/yld/\\d+.html',
		nextLink: '//a[text()="��һҳ"]',
		pageElement: '//article[@class="article-content"]',
		exampleUrl: 'http://www.bfpgf.com/yld/77066.html',
	},
	{name: '����ü',
		url: '^http://www\\.xiumeim\\.com/photos/.*\\.html',
		nextLink: '//a[text()="��ҳ>"]',
		pageElement: '//div[@class="gallary_wrap"]',
		exampleUrl: 'http://www.xiumeim.com/photos/YOUMI-189522.html',
	},
    {name: '����ü2',
		url: /^http:\/\/www\.xiumeim\.com(\/albums\/[^\/]+\.html)?/,
		nextLink: '//a[text()="��ҳ>"]',
		pageElement: '//div[@class="gallary_wrap"]',
		exampleUrl: 'http://www.xiumeim.com/',
	},
    {name: '��ͼ¼',
		url: '^https://www\\.meitulu\\.com/item/\\d+(_\\d+)?\\.html',
		nextLink: '//a[text()="��һҳ"]',
		pageElement: '//div[@class="content"]/center',
		exampleUrl: 'https://www.meitulu.com/item/3225_2.html',
	},
	{name: 'zhaofuli',
		url: '^http://zhaofuli\\.mobi/.*/\\d+/\\d+/\\d+\\.html',
		nextLink: '//a[text()="��һҳ"]',
		pageElement: '//article[@class="article-content"]',
		exampleUrl: 'http://zhaofuli.mobi/luyilu/2016/0224/1990.html',
	},
	{name: '�Ը�����',
		url: /^http:\/\/www\.xgyw\.cc\/[^\/]*\/[^\/]*\.html/,
		nextLink: '//div[@class="page"]/a[text()="��"]',
		pageElement: '//div[@class="img"]/p',
		exampleUrl: 'http://www.xgyw.cc/Xgyw/Xgyw6874.html',
	},
    {name: '�Ը�����2',
		url: /^http:\/\/www\.xgyw\.cc\/[^\/]*/,
		nextLink: '//div[@class="page"]/a[text()="��ҳ"]',
		pageElement: '/html/body/div[3]/table[3]/tbody/tr/td[1]/table[3]',
		exampleUrl: 'http://www.xgyw.cc/Xgyw',
	},
    {name: '81mm',
		url: '^http://www\\.81mm\\.net/\\d+\\.html',
		nextLink: '//div[@class="content_left"]/p/a[@title="���ͼƬ�鿴��һ��"]',
		pageElement: '//div[@class="content_left"]/p[1]',
		exampleUrl: 'http://www.81mm.net/1120.html',
	},
    // === ehentai ====
    {name: 'ehentai',
		url: /^https:\/\/e[-x]hentai\.org\/s\/.*\/.*/,
		nextLink: '//a[@id="next"]',
		pageElement: '//div[@id="i3"]',
		exampleUrl: 'https://e-hentai.org/s/f61cb59d07/1099124-3',
	},
    {name: 'ehentai gallary',
        url: /^https:\/\/e[x-]hentai\.org\/g\/[^\/]*\/[^\/]*(\/\?p=\d)?/,
		nextLink: '//table[@class="ptt"]/tbody/tr/td[last()]/a',
		pageElement: '//div[@id="gdt"]',
		exampleUrl: 'https://e-hentai.org/g/1109427/b827f866e1/?p=3',
	},
    {name: 'ehentai gallary front',
        url: /https:\/\/e[x-]hentai\.org(\/\?[fp].*)?/,
		nextLink: '//table[@class="ptt"]/tbody/tr/td[last()]/a',
		pageElement: '//div[@class="itg"]',
		exampleUrl: 'https://e-hentai.org/?page=2',
	},
    {name: 'wacg',
		url: '^http://www\\.wnacg\\.org/photos-view-id.*\\.html',
		nextLink: '//div/div/div/a[@class="btntuzao"]',
		pageElement: '//img[@id="picarea" and @class="photo"]',
		exampleUrl: 'http://www.wnacg.org/photos-index-aid-42394.html',
	},
    {name: 'wacglist',
		url: '^http://www\\.wnacg\\.org/photos-index.*\\.html',
		nextLink: '//span[@class="next"]/a',
		pageElement: '//div[@class="gallary_wrap"]',
		exampleUrl: 'http://www.wnacg.org/photos-view-id-2132443.html',
	},
    // === ��ֽ���زġ�icon
    {name: '�����ֽ',
        url: /^http:\/\/www\.zhuoku\.com\/.*\.htm/i,
        exampleUrl: 'http://www.zhuoku.com/zhuomianbizhi/computer-kuan/20140107052306.htm',
        nextLink: '//div[@class="turn"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("liebiao")',
        }
    },
    {name: 'ͳһ��ֽվ',
        url: '^http://www\\.3987\\.com/desk/wall/*',
        nextLink: '//a[@hidefocus="true" and @target="_self" and @title="��һҳ"]',
        pageElement: 'id("Article")/div[@class="big-pic"]',
        exampleUrl: 'http://www.3987.com/desk/wall/31420.html',
    },
    {name: '�ز�����',
        url: /^http:\/\/www\.sucaitianxia\.com\//i,
        exampleUrl: 'http://www.sucaitianxia.com/psd/Index.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="home_19"]/div[@class="left"]/div[@class="mid"]',
        }
    },
    {name: '��ͼ��',
        url: /^http:\/\/[a-z]+\.nipic\.com\//i,
        exampleUrl: 'http://soso.nipic.com/search.aspx?t=tk&q=%B7%E2%C3%E6',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("bd") | //ul[@class="search-result-box clearfix"] | //center/table[@width="900" and @cellspacing="0" and @cellpadding="0" and @border="0"]',
            lazyImgSrc: "data-original",
            stylish: '.lazy { display: block; }'
        }
    },
    {name: 'easyicon.net',
        url: '^http://www\\.easyicon\\.net/iconsearch/',
        nextLink: '//div[@class="pages_all"]/a[text()="��һҳ>"]',
        pageElement: 'id("result_right_layout")',
        exampleUrl: 'http://www.easyicon.net/iconsearch/feed/&color=black',
    },
    {name: 'iconarchive',
        url: '^http://www\\.iconarchive\\.com/search\\?q=*',
        nextLink: '//div[@class="pagination"]/a[@class="next"]',
        pageElement: 'id("layout-search-content")',
        exampleUrl: 'http://www.iconarchive.com/search?q=pin',
    },
    {name: 'Find Icons',
        url: '^http://findicons\\.com/search/',
        nextLink: '//div[@class="pages"]/a[contains(text(), "Next") or contains(text(), "��һҳ")]',
        pageElement: 'id("search_con")/div[@class="icon_list icon_list_165"]',
        exampleUrl: 'http://findicons.com/search/earth',
    },

    // ========================= software ================================
    {name: 'С�����',
        url: 'http://www\\.appinn\\.com/',
        nextLink: '//a[@class="nextpostslink"]',
        pageElement: '//div[@id="spost"]',
    },
    {name: '���ü���',
        url: /^http:\/\/xbeta\.info\/page\//i,
        exampleUrl: 'http://xbeta.info/page/2',
        nextLink: '//div[@class="wp-pagenavi"]/a[@class="nextpostslink"]',
        autopager: {
            pageElement: 'id("entries-in")/div[@class="post"]',
            replaceE: "css;#entries-in > .wp-pagenavi"
        }
    },
    {name: '���Ԫ�������',
        url: /^http:\/\/www\.iplaysoft\.com\//i,
        exampleUrl: 'http://www.iplaysoft.com/tag/%E5%90%8C%E6%AD%A5',
        nextLink: '//span[@class="pagenavi_c"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("postlist")/div[@class="entry"]',
            replaceE: '//div[@class="pagenavi"]/span[@class="pagenavi_c"]'
        }
    },
    {name: 'PlayNext - �͵������Ԫ',
        url: '^http://www\\.playnext\\.cn/',
        nextLink: '//div[@class="pagenavi"]/a[contains(text(), "��һҳ")]',
        pageElement: '//div[@id="container"]/div[@class="content"]/div[@class="post-list"]',
    },
    {name: 'iPc.me - ������������ľ��ʣ�',
        url: '^http://www\\.ipc\\.me/',
        nextLink: '//div[@class="pagenavi"]/a[contains(text(), "��һҳ")]',
        pageElement: 'id("posts-list")',
    },
    {name: '��ľ����',
        url: '^http://www\\.guofs\\.com/',
        nextLink: '//a[@class="nextpostslink"]',
        pageElement: 'id("content")',
        exampleUrl: 'http://www.guofs.com/',
    },
    {name: '�����',
        url: '^http://www\\.65052424\\.com/',
        nextLink: '//a[@class="next"]',
        pageElement: '//div[@id="content"]',
        exampleUrl: 'http://www.65052424.com/page/7',
    },
    {name: 'portableapps',
        url: '^http://portableapps\\.com/(?:forums|node)/',
        nextLink: '//li[@class="pager-next"]/a',
        pageElement: 'id("forum")/table|id("comments")/*[not(@class="item-list")]'
    },
    {name: 'PortableAppC - ���й���ɫ�ı�Я���',
        url: /^http:\/\/www\.portableappc\.com\//i,
        exampleUrl: 'http://www.portableappc.com/',
        nextLink: '//a[@class="nextpostslink"]',
        autopager: {
            pageElement: 'id("main")/div[@class="box"]',
            replaceE: '//div[@class="wp-pagenavi"]'
        }
    },
    {name: '��Ʒ��ɫ��Я���',
        url: '^http://www\\.portablesoft\\.org/',
        nextLink: '//div[@class="pagination"]/a[text()="��ҳ ?"]',
        pageElement: 'id("main")/div[@class="post-entry"]'
    },
    {name: 'zd423',
        url: /^http:\/\/www\.zdfans\.com\//i,
        exampleUrl: 'http://www.zdfans.com/',
        nextLink: '//div[@class="paging"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="wrapper"]/div[@class="content-wrap"]/div[@class="content column2"]/ul[@class="excerpt"]',
        }
    },
    {name: '����� - ԭ����ɫ�������,��Ʒ�������',
        url: /^http:\/\/www\.lite6\.com\//i,
        exampleUrl: 'http://www.lite6.com/',
        nextLink: '//li[@class="next"]/a',
        autopager: {
            pageElement: '//div[@class="main"]/div[@class="left"]',
        }
    },
    {name: 'Yanu | �������㡢��������ɫ��ʵ�õľ�Ʒ���',
        url: '^http://www\\.ccav1\\.com/*',
        nextLink: 'id("content-list")/div[@class="pagination"]/a[text()="��ҳ"]',
        pageElement: '//div[@id="content-list"]',
        exampleUrl: 'http://www.ccav1.com/',
    },
    {name: '�����԰(��ɫ����վ)',
        url: /^http:\/\/www\.downg\.com\/.*\.html/i,
        exampleUrl: 'http://www.downg.com/list/r_1_1.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="cp top-list" or @class="cp software-list"]/div[@class="cp-main"]',
        }
    },
    {name: '��ɫ���ذ�',
        url: /^http:\/\/www\.xiazaiba\.com\//,
        exampleUrl: 'http://www.xiazaiba.com/newsoft.html',
        nextLink: '//div[@class="page-num" or @class="ylmf-page"]/a[@class="nextprev"]',
        autopager: {
            pageElement: 'id("j_soft_list") | //ul[@class="list-soft list-soft-title j-hover"]',
        }
    },
    {name: '��������',
        url: /^http:\/\/www\.downbank\.cn\/.*\.htm/i,
        exampleUrl: 'http://www.downbank.cn/soft/html/newlist-1.htm',
        nextLink: '//p[@class="list_page"]/a[text()="��һҳ"] | id("NextPageText")//a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@id="topiclistzone"] | id("content")/div[@class="listitem"]/div[@class="cp-main"]',
        }
    },
    {name: 'С·������',
        url: /^http:\/\/www\.wzlu\.cc\/.*\.html/i,
        exampleUrl: 'http://www.wzlu.cc/soft/html/newlist-1.html',
        nextLink: '//p[@class="list_page"]/a[text()="��һҳ"] | id("NextPageText")//a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("topiclistzone") | id("listbox")',
        }
    },
    {name: '�ĺ�eվ',
        url: /^http:\/\/hrtsea\.com\//i,
        exampleUrl: 'http://hrtsea.com/',
        nextLink: 'id("pagenavi")/span[@class="older"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("main")',
        }
    },
    {name: '������Դ��',
        url: /^http:\/\/www\.ttrar\.com\//i,
        exampleUrl: 'http://www.ttrar.com/',
        nextLink: '//div[@id="page"]/a[text()="..."] | //div[@class="page"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: '//ul[@class="articlelist-ul"]',
            replaceE: "css;#page, .page"
        }
    },
    {name: '�ع����',
        url: /^http:\/\/briian\.com\//i,
        exampleUrl: 'http://briian.com/category/android/android-photos-draw',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("content")',
        }
    },
    {name: '�������',
        url: /^http:\/\/www\.tt7z\.com\//i,
        nextLink: 'auto;',
        autopager: {
            pageElement: '//ul[@class="articlelist-ul"]',
            replaceE: '//div[@id="left_content_list"]/div[@class="page"]'
        }
    },
    {name: 'Sublime text - Packages',
        url: '^https://sublime\\.wbond\\.net/browse',
        nextLink: '//nav[@class="pagination"]/a[@class="selected"]/following::a[1]',
        pageElement: '//div[@id="content"]/div[@class="results"]/ul[@class="packages results"]',
    },

    // ========================= dev =================================
    {name: 'User Scripts',
        url: /^https?:\/\/userscripts\.org/i,
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("review-list") | //tr[starts-with(@id, "scripts-")] | //tr[starts-with(@id, "posts-")]',
            replaceE: '//div[@class="pagination"]'
        }
    },
    {name: 'User scripts on Greasy Fork',
        url: /^https:\/\/greasyfork\.org/i,
        nextLink: '//a[@rel="next"]',
        autopager: {
            pageElement: 'id("browse-script-list") | id("Content")/ul',
        }
    },
    {name: 'User Styles',
        url: /^https?:\/\/(?:forum\.)?userstyles\.org\//i,
        nextLink: ['//a[@class="Next" and text()="?"]', 'auto;'],
        autopager: {
            pageElement: '//article[starts-with(@class,"style-brief")] | id("Content")/ul[@class="DataList Discussions"]',
            replaceE: 'css;.pagination'
        }
    },
    {name: '����԰',
        url: '^http://www\\.cnblogs\\.com/.*$',
        nextLink: '//a[(text()="Next >")]',
        pageElement: '//div[@id="post_list"]',
        exampleUrl: 'http://www.cnblogs.com/cate/javascript/',
    },
    {name: '��Դ�й�',
        url: '^http://\\w+\\.oschina\\.net/',
        nextLink: '//li[@class="page next"]/a',
        pageElement: '//div[@class="code_list"]/ul | //div[@class="ProjectList"]/ul[@class="List"] | id("OSC_Content")/div[@class="SpaceList BlogList"]/ul | \
            id("OSC_Content")/div[@class="QuestionList"]/ul/li[@class="question"]',
    },
    {name: 'CSDN����',
        url:/http:\/\/blog\.csdn\.net/i,
        siteExample:'http://blog.csdn.net/wangjieest?viewmode=list',
        nextLink:'//div[@id="papelist"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="article_list"]'
        }
    },
    {name: 'CSDN��̳',
        url:/^http:\/\/bbs\.csdn\.net\/forums\//i,
        siteExample:'http://bbs.csdn.net/forums/Qt',
        nextLink:'//div[@class="page_nav"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//body/div/div[@class="content"]/table',
            replaceE:'//div[@class="page_nav"]',
        }
    },
    {name: 'CSDN����',
        url:/^http:\/\/bbs\.csdn\.net\/topics\//i,
        siteExample:'http://bbs.csdn.net/topics/390244325',
        nextLink:'//div[@class="control_area"]/descendant::a[@class="next"]',
        autopager:{
            pageElement:'//div[@class="detailed"]',
            replaceE:'//div[@class="control_area"]',
        }
    },
    {name: '51CTO',
        url:/^http:\/\/\w+\.51cto\.com\/\w+\/\d+\/\w+\.htm/i,
        siteExample:'http://developer.51cto.com/art/201007/214478.htm',
        nextLink:'auto;',
        autopager:{
            useiframe:false,
            relatedObj:['css;#content','bottom'],
            pageElement:'css;#content>p'
        }
    },
    {name: 'ͼ������ : ͼ��',
        url: '^http://www\\.ituring\\.com\\.cn/article/',
        nextLink: 'auto;',
        pageElement: '//div[@id="question-header"]/h1 | //div[@class="post-text"]',
        separatorReal: false
    },
    {name: "Stack Overflow, Super User, Server Fault, Stack Apps",
        url: "^http://(?:meta\\.)?(?:s(?:erverfault|tackoverflow|uperuser|tackapps)|\\w+\\.stackexchange|askubuntu)\\.com/",
        nextLink: '//a[@rel="next"]',
        pageElement: "id(\"mainbar questions\")//div[contains(concat(\" \",@class,\" \"),\" question-summary \")]|id(\"answers\")/div[@class=\"pager-answers\"][1]/following-sibling::*[./following-sibling::div[@class=\"pager-answers\"]]",
    },

    // ========================= novel =============================
    {name: '�����ѧ',
        url:/^http:\/\/(www|read)\.(qidian|qdmm|qdwenxue)\.com\/BookReader\/\d+,\d+/i,
        siteExample:'http://www.qidian.com/BookReader/1545376,27301383.aspx',
        useiframe:true,
        nextLink:'//a[@id="NextLink"]',
        autopager:{
            enable:true,
            useiframe:true,
            pageElement:'//div[@id="maincontent"]/div[@class="booktitle"] | //div[@id="maincontent"]/div[@id="content"]'
        }
    },
    {name: '����С˵',
        url:/^http:\/\/book\.zhulang\.com\/.+\.html/i,
        siteExample:'http://book.zhulang.com/153319/62230.html',
        nextLink:'//div[@class="readpage_leftnfy"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="readpage_leftntxt"]',
        }
    },
    {name: '����쳾',
        url:/^http:\/\/www\.cc222\.com\/chapter\/.+\.html/i,
        siteExample:'http://www.cc222.com/chapter/558139.html',
        nextLink:'//div[@id="paging"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="aContainer"]',
            remain:1/5,
        }
    },
    {name: '17k',
        url:/^http:\/\/(mm.17k|www.17k)\.com\/chapter\/.+\.html/i,
        siteExample:'http://www.17k.com/chapter/143095/3714822.html',
        nextLink:'//div[@class="read_bottom"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="readAreaBox"]'
        }
    },
    {name: '�ݺ����',
        url:/^http:\/\/book\.zongheng\.com\/chapter\/.+\.html/i,
        siteExample:'http://book.zongheng.com/chapter/239553/4380340.html',
        nextLink:'//div[@class="tc quickkey"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="readcon"]'
        }
    },
    {name: '�ݺ�Ů��',
        url:/^http:\/\/www\.mmzh\.com\/chapter\/.+\.html/i,
        siteExample:'http://www.mmzh.com/chapter/182074/3287355.html',
        nextLink:'//div[@class="tc key"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="book_con"]'
        }
    },
    {name: '��С˵��',
        url:/http:\/\/book\.xxs8\.com\/.+\.html/i,
        siteExample:'http://book.xxs8.com/165779/859903.html',
        nextLink:'//div[@class="page"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="midbody"]',
            maxpage:10,
        }
    },
    {name: '����¥',
        url:/http:\/\/www\.shumilou\.com\/.+\.html/i,
        siteExample:'http://www.shumilou.com/tiandilonghun/698520.html',
        nextLink:'//div[@class="content"]/div[@id="content"]/div[@class="title"]/a[text()="��һҳ(��)"]',
        autopager:{
            pageElement:'//div[@class="content"]/div[@id="content"]',
        }
    },
    {name: '����С˵��',
        url:/^http:\/\/www\.xhxsw\.com\/books\/.+\.htm/i,
        siteExample:'http://www.xhxsw.com/books/1063/1063066/10579171.htm',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '���˶���',
        url:/^http:\/\/vip\.book\.sina\.com\.cn\/book\/.+\.html/i,
        siteExample:'http://vip.book.sina.com.cn/book/chapter_212356_210018.html',
        nextLink:'//p[@class="pages"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="mainContent"]'
        }
    },
    {name: '�Ѻ�ԭ��',
        url:/^http:\/\/vip\.book\.sohu\.com\/content/i,
        siteExample:'http://vip.book.sohu.com/content/124852/3902398/',
        nextLink:'//div[@class="artical_btn"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="bgdiv"]'
        }
    },
    {name: '��������',
        url:/^http:\/\/novel\.hongxiu\.com\/a\/.+\.shtml/i,
        siteExample:'http://novel.hongxiu.com/a/303084/3543064.shtml',
        nextLink:'//div[@class="papgbutton"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="wrapper_main"]'
        }
    },
    {name: '����С˵��',
        url:/^http:\/\/www\.xs8\.cn\/book\/.+\.html/i,
        siteExample:'http://www.xs8.cn/book/132368/86157.html',
        nextLink:'//div[@class="chapter_Turnpage"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="chapter_content"]'
        }
    },
    {name: '����С˵��',
        url:/^http:\/\/www\.laishu\.com\/book\/.+\.shtml/i,
        siteExample:'http://www.laishu.com/book/8/8891/5488036.shtml',
        nextLink:'auto;',
        autopager:{
            pageElement:'//table[@class="tabkuan"]'
        }
    },
    {name: 'С˵�Ķ���',
        url:/^http:\/\/www\.readnovel\.com\/novel\/.+/i,
        siteExample:'http://www.readnovel.com/novel/142947.html',
        nextLink:'//div[@class="bottomTools1"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@class="newContentBody "]'
        }
    },
    {name: '������',
        url:/^http:\/\/read\.fmx\.cn\/files\/article\/html\/.+\.html/i,
        siteExample:'http://read.fmx.cn/files/article/html/5/7/0/4/8/5/70485/1339404.html',
        nextLink:'//div[@class="newread_fy"]/descendant::a[text()="��һ��>>"]',
        autopager:{
            pageElement:'//div[@class="newbodybox"]'
        }
    },
    {name: '������',
        url:/http:\/\/www\.hongshu\.com\/content\/.+\.html/i,
        siteExample:'http://www.hongshu.com/content/38591/49531-1193339.html',
        nextLink:'//div[@class="ann"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="readtext"]'
        }
    },
    {name: '����ի',
        url:/^http:\/\/baishuzhai\.com/i,
        siteExample:'http://baishuzhai.com/shancunqirenchuan/683763.html',
        nextLink:'//div[@class="page"]/descendant::a[text()="��һ��(��ݼ�:��)"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="booktext"]'
        }
    },
    {name: '�����',
        url:/^http:\/\/baishuku\.com\/html\/.+\.html/i,
        siteExample:'http://baishuku.com/html/40/40514/8778339.html',
        nextLink:'//div[@id="footlink"]/a[text()="��һҳ(��ݼ�:��)"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '����С˵',
        url: '^http://www\\.23us\\.com/html/.+\\.html',
        siteExample: 'http://www.23us.com/html/26/26627/16952316.html',
        nextLink: ' //dd[@id="footlink"]/descendant::a[text()="��һҳ"]',
        pageElement: 'id("amain")/dl/dd/h1 | id("contents")'
    },
    {name: '������ѧ��',
        url:/^http:\/\/www\.kywxw\.com\/.+\.html/i,
        siteExample:'http://www.kywxw.com/0/12/3792643.html',
        nextLink:'//div[@id="thumb"]/descendant::a[text()="��һ��"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '�Ͱ���ѧ',
        url:/^http:\/\/www\.92wx\.org\/html\/.+\.html/i,
        siteExample:'http://www.92wx.org/html/0/807/220709.html',
        nextLink:'//div[@id="page_bar"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="chapter_content"]'
        }
    },
    {name: '����С˵��',
        url:/^http:\/\/www\.77shu\.com\/view\/.+\.html/i,
        siteExample:'http://www.77shu.com/view/0/20/2062418.html',
        nextLink:'auto;',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="chapter_content"] | //div[@id="content"]'
        }
    },
    {name: '��ζ����',
        url:/^http:\/\/www\.7wsw\.net\/html\/.+\.html/i,
        siteExample:'http://www.7wsw.net/html/shifangtianshi/719412.html',
        nextLink:'//div[@id="chapter_pager"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="book_middle_article"]'
        }
    },
    {name: '��������',
        url:/^http:\/\/www\.360118\.com\/html\/.+\.html/i,
        siteExample:'http://www.360118.com/html/21/21951/5416831.html',
        nextLink:'//div[@id="FootLink"]/descendant::a[text()="��һҳ����ݼ�����"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '�����԰',
        url:/^http:\/\/www\.yqhhy\.org\/novel\/.+\.html/i,
        siteExample:'http://www.yqhhy.org/novel/0/761/38769.html',
        nextLink:'//div[@id="link"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: 'ƽ����ѧ',
        url:/^http:\/\/www\.pnxs\.com\/book\/.+\.html/i,
        siteExample:'http://www.pnxs.com/book/zhongshengyantaizidan/2164438.html',
        nextLink:'//div[@class="book_middle_text_next"]/descendant::a[text()="��һ��"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="book_middle_text"]'
        }
    },
    {name: 'һ��С˵',
        url:/^http:\/\/www\.1lxs\.com\/novel\/.+\.html/i,
        siteExample:'http://www.1lxs.com/novel/80341/9055036.html',
        nextLink:'//div[@id="chapter_nav"]/descendant::a[text()="��һ��"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: 'һһС˵',
        url:/^http:\/\/www\.11xs\.com\/.+\.htm/i,
        siteExample:'http://www.11xs.com/xs/213/119908.htm',
        nextLink:'//div[@id="LinkMenu"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="Content"]'
        }
    },
    {name: '��������',
        url:/^http:\/\/www\.69zw\.com\/xiaoshuo\/.+\.html/i,
        siteExample:'http://www.69zw.com/xiaoshuo/21/21943/4461482.html',
        nextLink:'//div[@class="chapter_Turnpage"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@class="novel_content"]'
        }
    },
    {name: '�������',
        url:/^http:\/\/www\.hxsk\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.hxsk.net/files/article/html/67/67509/12704488.html',
        nextLink:'//td[@class="link_14"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//table[@class="border_l_r"]'
        }
    },
    {name: '��·/3K',
        url:/^http:\/\/www\.(shuluxs|kkkxs)\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.shuluxs.com/files/article/html/22/22306/8727879.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '��ɽ·',
        url:/^http:\/\/www\.shu36\.com\/book\/.+\.html/i,
        siteExample:'http://www.shu36.com/book/0/1/3.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '����',
        url:/^http:\/\/www\.luoqiu\.com\/html\/.+\.html/i,
        siteExample:'http://www.luoqiu.com/html/18/18505/1385765.html',
        nextLink:'//div[@id="bgdiv"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//table[@class="border_l_r"]',
        }
    },
    {name: '������',
        url:/^http:\/\/www\.junziwang\.com\/.+\.html/i,
        siteExample:'http://www.junziwang.com/0/155/25137.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '����С˵��',
        url:/^http:\/\/www\.hellodba\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.hellodba.net/files/article/html/0/46/21565.html',
        nextLink:'//div[@class="papgbutton"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="htmlContent"]'
        }
    },
    {name: '����¥',
        url:/^http:\/\/baishulou\.com\/read\/.+\.html/i,
        siteExample:'http://baishulou.com/read/10/10647/2536085.html',
        nextLink:'//a[text()="��һҳ(��ݼ�:��)"][@href]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '����¥',
        url:/^http:\/\/www\.wanshulou\.com\/xiaoshuo\/.+\.shtml/i,
        siteExample:'http://www.wanshulou.com/xiaoshuo/29/29091/2062593.shtml',
        nextLink:'//div[@id="LinkMenu"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="BookText"]'
        }
    },
    {name: '�������',
        url:/^http:\/\/www\.wjsw\.com\/html\/.+\.shtml/i,
        siteExample:'http://www.wjsw.com/html/35/35404/2887335.shtml',
        nextLink:'//div[@id="bookreadbottom"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="maincontent"]'
        }
    },
    {name: '������',
        url:/^http:\/\/www\.shushuw\.cn\/shu\/.+\.html/i,
        siteExample:'http://www.shushuw.cn/shu/28560/4509794.html',
        nextLink:'//div[@align="center"]/a[text()="��ҳ"][@href]',
        autopager:{
            pageElement:'//div[@class="cendiv"]'
        }
    },
    {name: '��¬С˵',
        url:/^http:\/\/b\.faloo\.com\/p\/.+\.html/i,
        siteExample:'http://b.faloo.com/p/247559/1.html',
        nextLink:'//div[@id="pager"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@class="main0"]'
        }
    },
    {name: '�����ѧ��',
        url:/^http:\/\/www\.qingdi\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.qingdi.com/files/article/html/0/27/13314.html',
        nextLink:'//div[@class="readerFooterPage"]/descendant::a[text()="��һҳ"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="readerTitle"]'
        }
    },
    {name: '������ѧ',
        url:/^http:\/\/www\.bxwx\.org\/b\/.+\.html/i,
        siteExample:'http://www.bxwx.org/b/56/56907/9020932.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="��һҳ[��]"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '��Ȥ��',
        url:/^http:\/\/www\.biquge\.com\/.+\.html/i,
        siteExample:'http://www.biquge.com/0_67/471472.html',
        nextLink:'//div[@class="bottem2"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: 'С˵��ջ',
        url:/^http:\/\/www\.xskz\.com\/xiaoshuo\/.+\.shtml/i,
        siteExample:'http://www.xskz.com/xiaoshuo/29/29091/2062593.shtml',
        nextLink:'//div[@id="LinkMenu"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="BookText"]'
        }
    },
    {name: '��΢��',
        url:/^http:\/\/www\.cuiweiju\.com\/html\/.+\.html/i,
        siteExample:'http://www.cuiweiju.com/html/124/124362/6468025.html',
        nextLink:'//p[@class="cz_bar"]/descendant::a[text()="��һ�� ��"]',
        autopager:{
            pageElement:'//div[@class="book_wrap"]'
        }
    },
    {name: '�������',
        url:/^http:\/\/www\.bookba\.net\/Html\/Book\/.+\.html/i,
        siteExample:'http://www.bookba.net/Html/Book/15/15995/2030251.html',
        nextLink:'//td[@id="thumb"]/descendant::a[text()="��һ��"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '��ѧ��',
        url:/^http:\/\/www\.wenxuemi\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.wenxuemi.net/files/article/html/10/10884/4852125.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '������ѧ��',
        url:/^http:\/\/www\.kenshu\.cc\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.kenshu.cc/files/article/html/5/5379/6389640.html',
        nextLink:'//dd[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@class="bdsub"]'
        }
    },
    {name: 'EƷ������',
        url:/^http:\/\/www\.epzw\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.epzw.com/files/article/html/50/50244/3271485.html',
        nextLink:'//div[@id="link"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '��Ҷ���Ժ',
        url:/^http:\/\/www\.dajiadu\.net\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.dajiadu.net/files/article/html/14/14436/3337407.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="center"]'
        }
    },
    {name: '��������',
        url:/^http:\/\/www\.bj-ibook\.cn\/book\/.+\.htm/i,
        siteExample:'http://www.bj-ibook.cn/book/17/t10409k/12.htm',
        nextLink:'//div[@class="zhtop"]/a[text()="��һҳ����ݼ�����"][@href]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="bmsy_content"]'
        }
    },
    {name: 'С˵570',
        url:/^http:\/\/www\.xiaoshuo570\.com/i,
        siteExample:'http://www.xiaoshuo570.com/11/11844/2678383.html',
        nextLink:'//div[@id="thumb"]/a[text()="��һҳ"][@href]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="fonts_big"]',
        }
    },
    {name: '����',
        url:/^http:\/\/www\.kanshu\.com\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.kanshu.com/files/article/html/30997/935806.html',
        nextLink:'//div[@class="yd_linebot"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//table[@class="yd_table"]'
        }
    },
    {name: 'ȫ��С˵��',
        url:/^http:\/\/www\.quanben\.com\/xiaoshuo\/.+\.html/i,
        siteExample:'http://www.quanben.com/xiaoshuo/10/10412/2095098.html',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '����ԭ��',
        url:/^http:\/\/www\.jjwxc\.net\/onebook\.php\?novelid=/i,
        siteExample:'http://www.jjwxc.net/onebook.php?novelid=862877&chapterid=6',
        nextLink: {
                startAfter:'&chapterid=',
                inc:1,
        },
        autopager:{
            pageElement:'//div[@class="noveltext"]',
        }
    },
    {name: '������',
        url:/^http:\/\/www\.qishuwu\.com\/.+/i,
        siteExample:'http://www.qishuwu.com/a_zhijian/314815/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="bgdiv"]'
        }
    },
    {name: 'lu5С˵��',
        url:/^http:\/\/www\.lu5\.com\/.+\.html/i,
        siteExample:'http://www.lu5.com/b/5/5442/9575830.html',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '�ɿ�',
        url:/^http:\/\/www\.feiku\.com\/\/html\/book\/.+\.shtm/i,
        siteExample:'http://www.feiku.com//html/book/130/164016/4891625.shtm',
        nextLink:'//div[@class="prenext"]/descendant::a[text()="��һҳ��"]',
        autopager:{
            pageElement:'//div[@id="chcontent"]'
        }
    },
    {name: '����С˵��',
        url:/http:\/\/www\.huanxia\.com\/book\w+\.html/i,
        siteExample:'http://www.huanxia.com/book548761_6041285.html',
        nextLink:'//a[@href][@id="htmlxiazhang"]',
        autopager:{
            pageElement:'//div[@class="h1title"] | //div[@id="htmlContent"][@class="contentbox"]',
            HT_insert:['//div[@id="htmlContent"]',2],
        }
    },
    {name: '������Ժ',
        url:/^http:\/\/www\.xxsy\.net\/books\/.*\.html/i,
        siteExample:'http://www.xxsy.net/books/485034/5259176.html',
        nextLink:'//div[@id="detailsubsbox"]/span/a[@href][@title="�Ķ���һ�½�"]',
        autopager:{
            pageElement:'//div[@id="detail_title"] | //div[@id="zjcontentdiv"]',
            HT_insert:['//div[@id="zjcontentdiv"]',2],
        }
    },
    {name: '�麣',
        url:/^http:\/\/www\.shuhai\.com\/read\/.+\.html/i,
        siteExample:'http://www.shuhai.com/read/4014/371553.html',
        nextLink:'//div[@class="page_operate font_blue"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="txt"]'
        }
    },
    {name: 'yi-see',
        url:/^http:\/\/www\.yi-see\.com/i,
        siteExample:'http://www.yi-see.com/read_266768_15501.html',
        nextLink:'//div[@class="B2"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//table[@width="900px"][@align="CENTER"]',
        }
    },
    {name: '��������',
        url:/^http:\/\/www\.fbook\.net\/book\/.+\.htm/i,
        siteExample:'http://www.fbook.net/book/35793/2656834.htm',
        nextLink:'//div[@id="pages"]/descendant::a[text()="��һ��"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@id="bookbody"]'
        }
    },
    {name: 'ͿѻС˵��',
        url:/^http:\/\/www\.tooya\.net\/.+\.html/i,
        siteExample:'http://www.tooya.net/tooya/2/2094/820902.html',
        nextLink:'//div[@class="novel_bottom"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '������/����',
        url:/^http:\/\/www\.(bxs|guli)\.cc\/.+/i,
        siteExample:'http://www.bxs.cc/26758/7708992.html',
        enable:true,
        nextLink:'//div[@id="papgbutton"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="main"]/h1 | //div[@id="readbox"]/div[@id="content"] | //div[@id="readbox"]/div[@id="papgbutton"]',
                            HT_insert:['//div[@id="weekhot"]',1],
        }
    },
    {name: '��ҹ����',
        url:/^http:\/\/www\.aoye\.cc\/.+\.html/i,
        siteExample:'http://www.aoye.cc/843/5.html',
        nextLink:'//div[@id="pagebottom"]/descendant::a[@id="nextpage"]',
        autopager:{
            pageElement:'//pre[@id="content"]'
        }
    },
    {name: '������ѧ',
        url:/^http:\/\/www\.tadu\.com\/book\/\d+\/\d+/i,
        siteExample:'http://www.tadu.com/book',
        nextLink:'//div[@class="container_center"]/div[@class="left"]/div[@class="jump"]/a[@href][text()="��һ��>>"]',
        autopager:{
            useiframe:true,
            pageElement:'//div[@class="container_center"]/div[@class="left"]/div[@class="content"][@id="partContent"]',
        }
    },
    {name: '�޴�С˵��',
        url:/^http:\/\/www\.wcxiaoshuo\.com\/wcxs\-\d+\-\d+/i,
        siteExample:'http://www.wcxiaoshuo.com/wcxs-*-*/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//div[@class="wrapper_main"][@id="jsreadbox"]/h1 | //div[@class="wrapper_main"][@id="jsreadbox"]/div[@id="htmlContent"][@class="contentbox"]',
        }
    },
    {name: 'ȼ��',
        url:/^http:\/\/www\.ranwen\.cc\/.+\.html/i,
        siteExample:'http://www.ranwen.cc/A/9/9818/3505060.html',
        nextLink:'//div[@class="pageTools"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="oldtext"]'
        }
    },
    {name: '���',
        url:/^http:\/\/www\.shuhe\.cc\/.+/i,
        siteExample:'http://www.shuhe.cc/30976/4401025/',
        nextLink:'//div[@class="bottem"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="TXT"]'
        }
    },
    {name: '89��ѧ',
        url:/^http:\/\/89wx\.com\/.+\.htm/i,
        siteExample:'http://89wx.com/html/book/70/70732/6641331.htm',
        nextLink:'//dd[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//dd[@id="contents"]'
        }
    },
    {name: '����С˵��',
        url:/^http:\/\/www\.186s\.cn\/files\/article\/html\/.+\.html/i,
        siteExample:'http://www.186s.cn/files/article/html/0/304/4528937.html',
        nextLink:'//div[@id="footlink"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '�ִ�8',
        url:/^http:\/\/shouda8\.com\/.+\.html/i,
        siteExample:'http://shouda8.com/zhangyuxingchen/85649.html',
        nextLink:'//div[@id="papgbutton"]/descendant::a[text()="��һ�£���ݼ� ����"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: '�������',
        url:/^http:\/\/read\.shanwen\.com\/.+\.html/i,
        siteExample:'http://read.shanwen.com/14/14616/1011063.html',
        nextLink:'//td[@class="tb0"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@id="content"]'
        }
    },
    {name: 'PaiTxt',
        url:/^http:\/\/paitxt\.com\/.+\.html/i,
        siteExample:'http://paitxt.com/24/24596/4507312.html',
        nextLink:'//div[@class="book_middle_text_next"]/descendant::a[text()="��һ��(��ݼ�:��)"]',
        autopager:{
            pageElement:'//div[@id="booktext"]'
        }
    },
    {name: '����¥',
        url:/^http:\/\/www\.haoshulou\.com\/.+\.html/i,
        siteExample:'http://www.haoshulou.com/Hao/6/60238.html',
        nextLink:'//div[@class="movenext"]/descendant::a[text()="��һ��"]',
        autopager:{
            pageElement:'//div[@id="booktext"]'
        }
    },
    {name: 'BookLink.Me:���а���С˵��������',
        url: '^http://booklink\\.me/',
        nextLink: '//a[text()="��һҳ"] | //a[font[text()="��һҳ"]]',
        pageElement: '//table[@width="100%"][@cellspacing="0"][@cellpadding="2"]',
        scroll_only: true
    },

    // =============================== manhua ========================
    {name: '�켫����Ƶ������',
        url:/http:\/\/comic\.yesky\.com\/\d+\/.+\.shtml/i,
        siteExample:'http://comic.yesky.com/249/11335749_5.shtml',
        nextLink:'//div[@id="numpage"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@class="article"]',
            remain:1.4,
            replaceE:'//div[@id="numpage"]',
        }
    },
    {name: '��������',
        url: /^http:\/\/(baozou|baozoumanhua)\.com\//i,
        nextLink: '//div[@class="pagebar"]/a[text()="��һҳ" or @class="next"] | //a[@class="next" and (text()="��һҳ")]',
        autopager: {
            pageElement: '//div[@class="main cf"]/div[@class="content-block cf"]/div[1]',
        }
    },
    {name: '����֮��������',
        url: "^http://(www|manhua)\\.dmzj\\.com/.+/.+shtml|^http://manhua\\.178\\.com/.+/.+shtml",
        siteExample:'http://manhua.178.com/lansechumoshi/15794.shtml',
        nextLink:'//div[@class="pages2"]/descendant::a[text()="��һҳ"]',
        autopager:{
            pageElement:'//div[@class="inner_img"]',
            useiframe:true,
        }
    },
    {name: '������',
        url:/^http:\/\/www\.imanhua\.com\/comic\/.+/i,
        siteExample:'http://www.imanhua.com/comic/55/list_39448.html',
        useiframe:true,
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/^http:\/\/www\.imanhua\.com\/comic\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var pageSelect=doc.getElementById('pageSelect');
                if(pageSelect){
                    var s2os=pageSelect.options;
                    var s2osl=s2os.length;
                    //alert(s2.selectedIndex);
                    if(pageSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            useiframe:true,
            remain:1/2,
            pageElement:'//img[@id="comic"]',
        }
    },
    {name: 'CC������',
        url: "^http://www\\.tuku\\.cc/comic/\\d+/\\d+/",
        siteExample:'http://www.tuku.cc/comic/6123/1/',
        nextLink:'auto;',
        autopager:{
            pageElement:'//img[@id="Img"]',
            useiframe:true,
        }
    },
    {name: '�¶���',
        url:/http:\/\/www\.xindm\.cn\/mh\/.+/i,
        siteExample:'http://www.xindm.cn/mh/shishangzuiqiangdizi/58784.html?p=2',
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/http:\/\/www\.xindm\.cn\/mh\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var topSelect=doc.getElementById('topSelect');
                if(topSelect){
                    var s2os=topSelect.options;
                    var s2osl=s2os.length;
                    if(topSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            pageElement:'//div[@class="photo"]',
            useiframe:true,
        }
    },
    {name: '������',
        url:/^http:\/\/www\.kkkmh\.com\/manhua\/\d+\/\d+\/\d+\.html/i,
        siteExample:'http://www.kkkmh.com/manhua/0710/1011/34412.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.kkkmh\.com\/manhua\/\d+\/\d+\/\d+\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, gm_win, lhref) {
                var pic_num = gm_win.pic.length;
                var url_info = lhref.split("?p=");
                var current_page = Number(url_info[1]);
                if (current_page >= pic_num) {
                    return true;
                }
            },
        },
        autopager: {
            pageElement: 'css;img#pic-show-area',
            remain: 1 / 3,
            documentFilter: function(doc, lhref) {
                var current_pic_server = unsafeWindow.current_pic_server,
                    hex2bin = unsafeWindow.hex2bin,
                    pic = unsafeWindow.pic;

                var url_info = lhref.split("?p=");
                var current_page = Number(url_info[1]);
                if (isNaN(current_page)) return;
                var imgSrc = current_pic_server + hex2bin(pic[current_page - 1]);
                doc.getElementById("pic-show-area").setAttribute('src', imgSrc);
            }
        }
    },
    // ��ʧЧ
    // {name: 'SF��������',
    //     url:/http:\/\/comic\.sfacg\.com\/HTML\/.+/i,
    //     siteExample:'http://comic.sfacg.com/HTML/ZXCHZ/001/#p=2',
    //     preLink:{
    //         startAfter:'#p=',
    //         inc:-1,
    //         min:1,
    //     },
    //     nextLink:{
    //         startAfter:'#p=',
    //         mFails:[/http:\/\/comic\.sfacg\.com\/HTML\/.+\//i,'#p=1'],
    //         inc:1,
    //         isLast:function(doc,win,lhref){
    //             var pageSel=doc.getElementById('pageSel');
    //             if(pageSel){
    //                 var s2os=pageSel.options;
    //                 var s2osl=s2os.length;
    //                 if(pageSel.selectedIndex==s2osl-1)return true;
    //             }
    //         },
    //     },
    //     autopager:{
    //         pageElement:'//img[@id="curPic"]',
    //         useiframe:true,
    //         replaceE: 'id("Pages")'
    //     }
    // },
    {name: '��Ѫ����',
        url: /^http:\/\/www\.rexuedongman\.com\/comic\//i,
        siteExample: 'http://www.rexuedongman.com/comic/2957/36463/index.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.rexuedongman\.com\/comic\/.+/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.getElementById('pageSelect');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            useiframe: true,
            pageElement: '//img[@id="mangaFile"]',
        }
    },
    {name: '����������',
        url: /^http:\/\/www\.jide123\.net\/manhua\/.*\.html/i,
        exampleUrl: 'http://www.jide123.net/manhua/3670/272725.html?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/www\.jide123\.net\/manhua\/.*\.html/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.getElementById('qTcms_select_i');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            pageElement: 'id("qTcms_pic")',
            useiframe: true,
        }
    },
    {name: '5652��������',
        url: /^http:\/\/mh\.5652\.com\/mh\/.*\.shtml/i,
        exampleUrl: 'http://mh.5652.com/mh/20130124/5484/125907.shtml?p=2',
        nextLink: {
            startAfter: '?p=',
            mFails: [/^http:\/\/mh\.5652\.com\/mh\/.*\.shtml/i, '?p=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.querySelector('.Directory_bar select');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            pageElement: 'id("show_img")',
            useiframe: true,
        }
    },
    {name: '��������',
        url: /^http:\/\/\w+\.(?:vs20|3gmanhua|hhcomic)\.(?:com|net)\/\w+\/\w+\.htm/i,
        siteExample: 'http://page.vs20.com/1815454/115321.htm?v=2*s=6',
        nextLink: function(doc, win, cplink) {
            // hrefInc �ķ�ʽ������Ϊ�����ַ����ж���� *s=6
            var m = cplink.match(/\?v=(\d+)/);
            if (!m) {
                // ��һҳ������� http://page.vs20.com/1815454/115321.htm?s=6
                return cplink.replace('?s=', '?v=2*s=');
            } else {
                var current = Number(m[1]),
                    next = current + 1;

                var select = doc.querySelector('#all select');
                if (!select) return;
                var max = select.options.length;
                if (next > max) return;
                return cplink.replace(m[0], '?v=' + next);
            }
        },
        autopager: {
            useiframe: true,
            pageElement: '//img[@id="ComicPic"]',
        }
    },
    {name: '99����old',
        url: /^http:\/\/(cococomic|dm.99manga|99manga|99comic|www.99comic|www.hhcomic)\.(com|cc)\/.+\.htm/i,
        siteExample: 'http://99manga.com/page/168/6481.htm?v=3*s=9',
        nextLink: {
            startAfter: '?v=',
            inc: 1,
            isLast: function(doc, win, lhref) {
                var select = doc.querySelector('#all select');
                if (select) {
                    var s2os = select.options;
                    var s2osl = s2os.length;
                    if (select.selectedIndex == s2osl - 1) return true;
                }
            },
        },
        autopager: {
            useiframe: true,
            pageElement: '//img[@id="ComicPic"]',
        }
    },
    {name: '99����new',
        url: /^http:\/\/(1mh|99mh|mh.99770|www.jmydm)\.(com|cc)\/.+/i,
        siteExample: 'http://99mh.com/comic/8436/117728/?p=1&s=0',
        nextLink: {
            startAfter: '?p=',
            inc: 1,
        },
        autopager: {
            useiframe: true,
            maxpage: 20,
            pageElement: '//div[@id="iBody"]',
        }
    },
    {name: '����Fans',
        url: /http:\/\/www\.dm123\.cn\/bbs\/(thread\.php\?fid=|read\.php\?tid=)/i,
        siteExample: 'http://www.dm123.cn/bbs/read.php?tid=593645',
        nextLink: 'auto;',
        autopager: {
                pageElement: '//tbody[@id="threadlist"]|//div[@id="pw_content"]',
        }
    },
    {name: 'KuKu����',
        url:/http:\/\/comic\.kukudm\.com\/comiclist\/\d+\/\d+.*\.htm/i,
        siteExample:'http://comic.kukudm.com/comiclist/4/17099/3.htm',
        useiframe:true,
        nextLink:'//a[img[contains(@src,"images/d.gif")]]',
        autopager:{
            useiframe:true,
            pageElement:'//body/table[2]'
        }
    },
    {name: '52pk����',
        url:/http:\/\/(op|sishen|narutocn)\.52pk\.com\/manhua\/\d+\/\d+/i,
        siteExample:'http://op.52pk.com/manhua/2010/921364.html',
        nextLink:'//li[@id="page__next"]/a[1]',
        autopager:{
            relatedObj:['css;li#page__select','bottom'],
            pageElement:'//div[@id="pictureContent"]'
        }
    },
    {name: '����������',
        url:/http:\/\/www\.u17\.com\/comic_show\/.+/i,
        siteExample:'http://www.u17.com/comic_show/c28540_m0.html',
        autopager:{
            pageElement:'//div[@class="mg_auto"]',
            useiframe:true,
        }
    },
    {name: '������',
        url:/http:\/\/(www|tel)\.dm5\.com\/.+/i,
        nextLink:'//span[@id="s_next"]/a[1]',
        autopager:{
            pageElement:'//div[@id="showimage"]',
            useiframe:true,
        }
    },
    {name: '��ʹ������,TSDM������',
        url:/^http:\/\/mh\.tsdm\.net\/comic\/.+/i,
        siteExample:'http://mh.tsdm.net/comic/4697/68059.html',
        useiframe:true,
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/^http:\/\/mh\.tsdm\.net\/comic\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var pageSelect=doc.getElementById('qTcms_select_i');
                if(pageSelect){
                    var s2os=pageSelect.options;
                    var s2osl=s2os.length;
                    //alert(s2.selectedIndex);
                    if(pageSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            useiframe:true,
            remain:1/2,
            pageElement:'//img[@id="qTcms_pic"]',
        }
    },
    {name: '����Ƶ��_������',
        url: /^http:\/\/manhua\.ali213\.net\/comic\/.*\.html/i,
        exampleUrl: 'http://manhua.ali213.net/comic/5257/141336.html',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//div[@class="enjoy_hostcon"]',
            useiframe: true,
            replaceE: "//div[@class='enjoy_center_bottom_page']//*[@class='li_middle' or @class='previouspage' or @class='nextpage']"
        }
    },
    {name: '��Ӱ����������',
        url:/http:\/\/www\.narutom\.com\/comic\/.+/i,
        siteExample:'http://www.narutom.com/comic/11624.html?p=3',
        preLink:{
            startAfter:'?p=',
            inc:-1,
            min:1,
        },
        nextLink:{
            startAfter:'?p=',
            mFails:[/http:\/\/www\.narutom\.com\/comic\/.+\.html/i,'?p=1'],
            inc:1,
            isLast:function(doc,win,lhref){
                var topSelect=doc.getElementById('topSelect');
                if(topSelect){
                    var s2os=topSelect.options;
                    var s2osl=s2os.length;
                    if(topSelect.selectedIndex==s2osl-1)return true;
                }
            },
        },
        autopager:{
            pageElement:'//img[@id="showImg"]',
            useiframe:true,
        }
    },
    {name: '����������',
        url:/http:\/\/(?:\w+\.)?bleachcn\.net\/manhua\/.+/i,
        siteExample:'http://naruto.bleachcn.net/manhua/6759.html',
        nextLink:'//div[@id="comic_pages"]/a[text()="��һҳ"][@href]',
        autopager:{
            pageElement:'//div[@id="comic_endtext"]',
        }
    },
    {name: 'iiikl��̳',
        url: '^http://bbs\\.iiikl\\.net/forum\\.php\\?forum_id=.*',
        nextLink: '//a[@class="next"]',
        pageElement: '//tr[@class="topic_list_row"]',
        exampleUrl: 'http://bbs.iiikl.net/forum.php?forum_id=82&class_id=0&page=2'
    },
    {name: 'sosg��̳����',
        url:/http:\/\/www\.sosg\.net\/read/i,
        siteExample:'http://www.sosg.net/read.php?tid=424833',
        nextLink:'//td[@align="left"]/b/following-sibling::a[@href]',
        autopager:{
            pageElement:'//div[@id="b5"]/form/a/table[1]',
        }
    },
    {name: '�ο���������',
        url:/http:\/\/bbs\.sumisora\.org\/read\.php\?tid=/i,
        siteExample:'http://bbs.sumisora.org/read.php?tid=11015694',
        nextLink:'auto;',
        autopager:{
            pageElement:'css;.t.t2',
        }
    },
    {name: '9gal��ѩ��̳',
        url:/http:\/\/bbs\.(9gal|9baka)\.com\/read\.php\?tid=/i,
        siteExample:'http://bbs.9gal.com/read.php?tid=299016',
        nextLink:'auto;',
        autopager:{
            pageElement:'//form[@method="post"]/a[@name]/following-sibling::div',
            replaceE:'//ul[@class="pages"]',
        },
    },
    {name: '��а��|���ACG���� �Ĳ��ڳ�.�ں����� ͼ����ɫ.��������',
        url: /^http:\/\/www\.hexieshe\.com\//i,
        exampleUrl: 'http://www.hexieshe.com/',
        nextLink: '//div[@class="pagebar"]/a[text()="Next"]',
        autopager: {
            pageElement: 'id("centent")',
        }
    },
    {name: 'haruhichan',
        url: /^http:\/\/haruhichan\.com\//i,
        nextLink: '//a[@rel="next"]',
        autopager: {
            pageElement: '//div[@id="postlist"]',
        }
    },
    {name: 'exhentai',
        url: '^http://exhentai\\.org/s/.*$',
        nextLink: '//img[@src="http://st.exhentai.net/img/n.png"]/..',
        pageElement: '//body/div[@class="sni"]',
        exampleUrl: 'http://exhentai.org/s/0088446283/653117-4',
        useiframe: true
    },
    {name: 'exhentai gallery',
        url: /^http:\/\/exhentai\.org\/g\//i,
        exampleUrl: 'http://exhentai.org/g/514954/d4fcb4973e/?p=1',
        nextLink: '//table[@class="ptt"]//a[text()=">"]',
        autopager: {
            pageElement: '//div[@id="gdt"]',
            relatedObj: true
        }
    },
    {name: 'exhentai frontpage',
        url: /^http:\/\/exhentai\.org\/(\?[^\/]+)?$/i,
        exampleUrl: 'http://exhentai.org/?page=2',
        nextLink: '//table[@class="ptt"]//a[text()=">"]',
        autopager: {
            pageElement: '//table[@class="ptt"]/..',
            relatedObj: true
        }
    },
    {name: 'Hentai Manga|Read free hentai xxx manga online',
        url: /^http:\/\/hentai4manga\.com\//i,
        exampleUrl: 'http://hentai4manga.com/',
        nextLink: '//div[@class="pages"]/a[contains(text(), ">")]',
        autopager: {
            pageElement: 'id("innerContent")',
        }
    },
    {name: '1024����',
        url: '^http://(www\\.)?t66y\\.com/|^http://cl\\.man\\.lv/',
        nextLink: '//div[@class="pages"]/b/following-sibling::a[1]',
        pageElement: 'id("ajaxtable") | id("main")',
        exampleUrl: 'http://t66y.com/thread0806.php?fid=15',
    },
    {name: 'DLsite �����Y��',
        url: /^http:\/\/(?:[^.]+\.)?dlsite\.com\//i,
        exampleUrl: 'http://www.dlsite.com/home/fsr/=/language/jp/keyword/kon/age_category%5B0%5D/general/per_page/30/show_type/n/page/2',
        nextLink: '//td[@class="page_no"]/ul/li/a[text()="�Τ�" or text()="Next"]',
        autopager: {
            pageElement: 'id("search_result_list")',
        }
    },
    {name: 'Gyutto.com���Η����Y��',
        url: /^http:\/\/gyutto\.com\/search\/search_list\.php/i,
        exampleUrl: 'http://gyutto.com/search/search_list.php?_adult_check=yes&action=perPage&search_keyword=lol&search_type=&mode=search&perPage=30&pageID=2&ref_path=%2Fsearch%2Fsearch_list.php',
        nextLink: '//a[text()="�Τ�30����"]',
        autopager: {
            pageElement: 'id("struct_2ColRightIn")/div[@class="unit_ItemList"]/div[contains(@class, "parts_ItemBox")]',
            relatedObj: true
        }
    },
    {name: 'JAVLibrary',
        url: /^http:\/\/www\.javlibrary\.com\/cn\//i,
        exampleUrl: 'http://www.javlibrary.com/cn/vl_bestrated.php',
        nextLink: '//div[@class="page_selector"]/a[@class="page next"]',
        autopager: {
            pageElement: 'id("rightcolumn")/div[@class="videothumblist"] | id("rightcolumn")/div[@class="starbox"]',
        }
    },
    {name: 'NyaaTorrents',
        url: '^http://(?:(?:www|sukebei?)\\.)?nyaa\\.se/',
        nextLink: '//div[@class="pages"]/b/following-sibling::a[1]',
        pageElement: '//table[@class="tlist"]',
        exampleUrl: 'http://www.nyaa.se/',
    },
    {name: '��Ӱ����',
        url: 'http://bt.ktxp.com/.+[0-9]+-*',
        nextLink: '//span[@class="current"]/following-sibling::a[1]',
        pageElement: '//div[@class="item-box round-corner" and div/@class="title"]',
    },
    {name: 'BTDigg Search',
        url: '^https?://btdigg.org/search*',
        nextLink: '//a[contains(text(),"��")]',
        pageElement: '//body/div/div/center',
    },


    // ==================== ����վ�� ===================
    {name: 'AnandTech',
        url: '^http://anandtech\\.com/',
        nextLink: '//div[@class="pagination"]/ul/li[@class="arrow"]/a[text()="?"]',
        pageElement: '//section[@class="content"]/section[@class="main_cont"]/section[@class="main_cont"]',
        exampleUrl: 'http://anandtech.com/tag/mb',
    },
    {name: 'Android Police - Android News, Apps, Games, Phones, Tablets',
        url: '^http://www\\.androidpolice\\.com/',
        nextLink: '//div[@class="wp-pagenavi"]/a[text()="Next?"]',
        pageElement: '//div[@id="content"]',
        exampleUrl: 'http://www.androidpolice.com/',
    },
    {name: 'Anonymous speaks: the inside story of the HBGary hack | Ars Technica',
        url: '^http://arstechnica\\.com/',
        nextLink: '//a[span[contains(concat(" ", @class, " "), " next ")]]',
        pageElement: '//article[contains(concat(" ", @class, " "), " standalone ")]/section[@id="article-guts"]',
        exampleUrl: 'http://arstechnica.com/tech-policy/2011/02/anonymous-speaks-the-inside-story-of-the-hbgary-hack/',
    },
    {name: 'techPowerUp',
        url: '^http://www\\.techpowerup\\.com/',
        nextLink: '//a[@class="nextpage-top"] | //a[contains(text(),"Next")]',
        pageElement: '//div[@class="text"] | //section[@id="list"] | //form[@class="DiscussionList InlineModForm" or @class="InlineModForm section"]',
        exampleUrl: 'http://www.techpowerup.com/reviews/GSkill/F3-1600C7Q-32GTX/',
    },
    {name: 'Digital Photography Review',
        url: '^http://www\\.dpreview\\.com/',
        nextLink: '//a[@rel="nofollow"][contains(text(), "Next")]',
        pageElement: 'id("mainContent")/div[@class="news withDayIcons"]',
        exampleUrl: 'http://www.dpreview.com/previews/sony-cybershot-dsc-rx1r',
    },
    {name: 'Digital Photography Review 2',
        url: '^http://www\\.dpreview\\.com/',
        nextLink: '//div[@class="reviewPagesDropdown"]/a/img[@alt="Next page"]/..',
        insertBefore: 'id("amazonBuyboxContainer")',
        autopager: {
            pageElement: 'id("mainContent")',
            filter: 'css;.reviewNavigatorTop, #amazonBuyboxContainer, .ad, #comments, .buyboxOld.amazon',
                relatedObj: ['css;div.reviewNavigatorBottom','bottom'],
                HT_insert: ['id("amazonBuyboxContainer")',1],
        }
    },

    //-================ �ֻ���վ ========================
    {name: '�ֻ��ٶȰٿ�',
        url: /^http:\/\/wapbaike\.baidu\.com\//i,
        exampleUrl: 'http://wapbaike.baidu.com/goodlist?uid=F381CCCD6FD2F58151EFFB4A63BFA4FF&ssid=0&pu=sz%401321_1004&bd_page_type=1&from=844b&st=4&step=2&net=1&bk_fr=bk_more_glist',
        nextLink: '//div[@class="pages"]/a[text()="��һҳ"] | //div[@class="page"]/p[@class="next"]/a[text()="��ҳ"] | //table[@class="table next"]//a[text()="��ҳ"] | //a[@class="m-rm-5" and text()="����ȫ��"]',
        autopager: {
            pageElement: '//div[@class="bd"] | //div[@class="list"] | id("lemma-content")',
            separatorReal: false,
            replaceE: 'css;.page > .p-num'
        }
    },
    {name: '�ֻ�����',
        url: /^http:\/\/m\.douban\.com\/.*/i,
        exampleUrl: 'http://m.douban.com/book/subject/1088065/reviews?session=c0ea1419',
        nextLink: '//div[@class="pg" or @class="paginator"]/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("bd")/div[@class="itm"] | //div[@class="bd"]/div[@class="list"]',
            separatorReal: false
        }
    },
    {name: '�ֻ���������',
        url: /^http:\/\/[a-z]+\.sina\.cn\/\?sa=/i,
        exampleUrl: 'http://news.sina.cn/?sa=t124d10608655v71&pos=108&vt=4&clicktime=1386267238910&userid=user138626723891024077253801575993',
        nextLink: 'id("j_loadingBtn")',
        autopager: {
            pageElement: 'id("j_articleContent")',
            relatedObj: true
        }
    },
    {name: '�ֻ�������',
        url: '^http://3g\\.163\\.com/[a-z]+/.*\\.html',
        exampleUrl: 'http://3g.163.com/news/13/0914/04/98N4CSHI0001124J.html',
        nextLink: ['//a[text()="����ȫ��"]', '//a[text()="��ҳ"]'],
        autopager: {
            pageElement: '//div[@class="content"]',
            // separator: false,
            replaceE: '//div[@class="reset marTop10 cBlue"][child::a[text()="��ҳ"]] | //div[child::form[@class="reset"]]',
            relatedObj: true,
        }
    },
    {name: '�ֻ������',
        url: '^http://3g\\.ifeng\\.com/[a-z]+/',
        exampleUrl: 'http://3g.163.com/news/13/0914/04/98N4CSHI0001124J.html',
        nextLink: ['//a[text()="����ȫ��"]', '//a[text()="��һҳ"]'],
        autopager: {
            pageElement: '//div[@class="zwword"]',
            // separator: false,
            relatedObj: true,
        }
    },
    {name: '�ֻ�������',
        url: '^http://wap\\.huanqiu\\.com/',
        nextLink: ['//a[text()="����ȫ��"]', '//a[text()="��һҳ"]'],
        autopager: {
            pageElement: '//div[@class="newscont"]',
            // separator: false,
            separatorReal: false,
            relatedObj: true,
        }
    },
    {name: 'cnBeta.COM - �ƶ���',
        url: /^http:\/\/m\.cnbeta\.com\//i,
        exampleUrl: 'http://m.cnbeta.com/',
        nextLink: 'id("yw0")/a[@class="page-next"]',
        autopager: {
            pageElement: '//div/div/div[@class="list"]',
        }
    },
    {name: '�ֻ���M.BookLink.Me',
        url: /^http:\/\/m\.booklink\.me\//i,
        exampleUrl: 'http://m.booklink.me/charpter.php?site_id=2&book_id=69507',
        nextLink: '//div[@class="sec nav"]/form/a[text()="��һҳ"]',
        autopager: {
            pageElement: 'id("m_main")/ul[@class="list sec"]',
        }
    },
    {name: '��Դ�й�(OSChina.NET)',
        url: /^http:\/\/m\.oschina\.net\//i,
        exampleUrl: 'http://m.oschina.net/',
        nextLink: 'auto;',
        autopager: {
            pageElement: '//ul[@class="ui-listview"]',
            useiframe: true
        }
    },
    {name: '����԰�����ֻ���',
        url: /^http:\/\/m\.cnblogs\.com\/blog\//i,
        exampleUrl: 'http://m.cnblogs.com/blog/',
        nextLink: '//a[text()="��һҳ"]',
        autopager: {
            pageElement: '//div[@class="list_item"]',
        }
    },

    // ============== google ����======================
    {name: "Google Bookmarks",
        "url": "^https?://www\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/bookmarks/",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" kd-buttonbar \")]//tr/td[last()-1 or last]/a[img[contains(@src,\"right.png\")]]",
        "pageElement": "id(\"search\")"
    },
    {name: "Google Code List",
        url: "^https?://code\\.google\\.com/[pr]/(?:[^/]+/){2}list",
        nextLink: "id(\"colcontrol\")//div[contains(concat(\" \", @class, \" \"), \" pagination \")]/a[contains(., \"?\")]",
        pageElement: "id(\"resultstable\")//tr"
    },
    {
        "url": "^https?://code\\.google\\.com/hosting/search\\?",
        "nextLink": "id(\"serp\")/following::a[contains(., \"Next\")][1]",
        "pageElement": "id(\"serp\")/*"
    },
    {
        "url": "^http://[^.]+\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/codesearch",
        "nextLink": "(id(\"navbar\")//td[@class=\"b\"]/a)[last()]",
        "pageElement": "//*[self::div[@class=\"h\"] or self::pre[@class=\"j\"] or self::div[@class=\"f\"]]",
        "insertBefore": "id(\"navbar\")"
    },
    {
        "url": "^https?://groups\\.google(?:\\.[^./]{2,3}){1,2}/groups/search",
        "nextLink": "id(\"navbar\")//td[last()][@class=\"b\"]/a",
        "pageElement": "id(\"res\")/*[self::div or self::br]"
    },
    {
        "url": "^http://scholar\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/scholar",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" n \")]/table/tbody/tr/td[last()]/a|id(\"gs_n\")//table/tbody/tr/td[span and b]/following-sibling::td/a",
        "pageElement": "//form[@name=\"gs\"]/following-sibling::node()[ following::div[contains(concat(\" \", @class, \" \"), \" n \")] ]|id(\"gs_ccl\")/div[@class=\"gs_r\"]"
    },
    {
        "url": "^http://(?:[^.]+\\.)?google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/news",
        "nextLink": "id(\"end-next\")/..",
        "pageElement": "id(\"search-stories story-articles\")"
    },
    {
        "url": "^https?://www\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/history/",
        "nextLink": "//td[@class=\"bl\"][last()-1]/a|//div[@class=\"nn\"]/parent::a",
        "pageElement": "//table[@class=\"res\"]"
    },
    {
        "url": "^http://www\\.google\\.[^./]{2,3}(?:\\.[^./]{2,3})?/logos/",
        "nextLink": "//div[@class=\"base-nav\"]//a[contains(., \"?\")]",
        "pageElement": "id(\"doodles\")|//div[contains(concat(\" \", @class, \" \"), \" title \")]"
    },
    {
        "url": "^http://books\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/books",
        "nextLink": "id(\"navbar\")//span[@class=\"navlink\"]/parent::a",
        "pageElement": "id(\"main_content\")/*"
    },
    {
        "url": "^https?://appengine\\.google\\.com/datastore/explorer\\?.",
        "nextLink": "id(\"ae-datastore-explorer\")//a[@class=\"ae-paginate-next\"]",
        "pageElement": "id(\"ae-datastore-explorer-entities\")"
    },
    {
        "url": "^https?://(?:[^/]+\\.)?google(?:\\.\\w{2,3}){1,2}/movies",
        "nextLink": "id(\"pnnext\")|id(\"navbar navcnt nav\")//td[span]/following-sibling::td[1]/a|id(\"nn\")/parent::a",
        "pageElement": "id(\"movie_results\")/*"
    },
    {
        "url": "^https://chrome\\.google\\.com/webstore/(?:list|search)",
        "nextLink": "//table[@class=\"paginator\"]//td[last()]/a",
        "pageElement": "//div[@class=\"mod-fullpage\"]/div[@class=\"mod-body\"]"
    },
    {
        "url": "^http://www\\.google\\.com/intl/ja/googlebooks/chrome/",
        "nextLink": "id(\"info\")/p[contains(concat(\" \",@class,\" \"),\"nav\")]/a[img[@src=\"images/arrowright.gif\"]]",
        "pageElement": "id(\"page\")/div[a[img] or img]"
    },
    {
        "url": "^http://desktop\\.google\\.(?:[^.]{2,3}\\.)?[^./]{2,3}/",
        "nextLink": "id(\"content\")/table[@class=\"header\"]//a[contains(., \"?\")]",
        "pageElement": "id(\"content\")/*[(self::table and @class=\"gadget\") or (self::br and @style=\"clear: both;\")]"
    },
    {
        "url": "^http://sketchup\\.google\\.com/3dwarehouse/search\\?",
        "nextLink": "//div[@class=\"pager_next\"]/parent::a",
        "pageElement": "//div[@class=\"searchresult\"]/ancestor::tr[1]"
    },
    {
        "url": "^https://www\\.google\\.com/a/cpanel/[^/]+/",
        "nextLink": "//tr//ul[@class=\"inlinelist\"]//a[contains(text(),\"?\")]",
        "pageElement": "id(\"list\")"
    },
    {
        "url": "^http://www\\.google\\.com/support/forum/",
        "nextLink": "//div[@class=\"wppkrootCSS\"]/a[contains(text(), \">\")]",
        "pageElement": "//table[@class=\"lctCSS\"]"
    },
    {
        "url": "^http://www\\.google\\.com/products\\?",
        "nextLink": "id(\"nn\")/parent::a",
        "pageElement": "id(\"results\")|id(\"results\")/following-sibling::p[@class=\"clear\"]"
    },
    {
        "url": "^http://www\\.google\\.com/reviews/t",
        "nextLink": "//a[contains(text(), \"Next\")]",
        "pageElement": "id(\"allresults\")/table",
        "insertBefore": "//div[contains(concat(\" \", normalize-space(@class), \" \"), \" t_ftr \")]"
    },
    {
        "url": "^http://www\\.google\\.com/cse\\?cx=",
        "nextLink": "//div[@class='gsc-cursor-page gsc-cursor-current-page']/following-sibling::node()[1]",
        "pageElement": "//div[@class='gsc-webResult gsc-result']",
        "insertBefore": "//div[@class='gsc-cursor-box gs-bidi-start-align']"
    },
    {
        "url": "^http://www\\.google(?:\\.[^./]{2,3}){1,2}/m\\?.",
        "nextLink": "//*[starts-with(text(), \"Next page\") or starts-with(text(), \"�ΤΥک`��\")]",
        "pageElement": "id(\"universal\")/div[not(@*)]",
        "insertBefore": "id(\"universal\")/*[@class][last()]"
    },
    {
        "url": "^http://followfinder\\.googlelabs\\.com/search",
        "nextLink": "//td[@class=\"more\"]//a[last()]",
        "pageElement": "//table//tr[//div]"
    },
    {
        "url": "^http://www\\.googlelabs\\.com/",
        "nextLink": "id(\"nav\")//td[@class=\"cur\"]/following-sibling::td[1]/a",
        "pageElement": "id(\"nav\")/preceding-sibling::ul"
    },

    // ========================= github ================================
    {name: "github mix",
        "url": "^https?://github\\.com/(?:dashboard|(?:timeline|[^/]+/[^/]+/(?:comments|network/feed)))",
        "nextLink": "//a[@hotkey=\"l\"]|//div[contains(concat(\" \",@class,\" \"),\" pagination \")]/a",
        "pageElement": "//div[@class=\"news\"]/div[contains(@class, \"alert\")]"
    },
    {name: "github ����",
        url: "^https?://github\\.com/search",
        nextLink: "//div[@class='pagination']/a[@rel='next']",
        autopager: {
            pageElement: "id('code_search_results issue_search_results')|//div[@class='sort-bar']/following-sibling::*[following-sibling::span[@class='search-foot-note']]",
            insertBefore: "//div[@class='pagination']",
            stylish: 'li.repo-list-item { text-align: left; }'
        }
    },
    {
        "url": "^https?://gist\\.github\\.com/",
        "nextLink": "//div[contains(concat(\" \", @class, \" \"), \" pagination \")]/a[contains(text(),\"Older\")]",
        "pageElement": "//div[contains(concat(\" \", @class, \" \"), \" gist-item \")]"
    },
        // �е�С���⣬��Ҫˢ���²�����
    {
        "url": "^https?://github\\.com/(?:changelog|[^/]+/[^/]+/commits)",
        "nextLink": "//a[contains(text(), \"Older\")]",
        "pageElement": "//*[starts-with(@class,\"commit-group\")]"
    },
    {
        "url": "^https?://github\\.com/[^/]+/[^/]+/watchers",
        "nextLink": "//div[@class=\"pagination\"]/span[@class=\"current\"]/following-sibling::a",
        "pageElement": "id(\"watchers\")"
    },
    {
        "url": "^https?://github\\.com/[^/]+/following",
        "nextLink": "//a[hotkey='l']",
        "pageElement": "id(\"watchers\")"
    },
    {
        "url": "^http://learn\\.github\\.com/p/",
        "nextLink": "//a[contains(text(), \"next\")]",
        "pageElement": "//div[@class=\"container\"]/div[@id=\"welcome\" or @class=\"content\"]"
    },
    {
        "url": "^http://github\\.com/blog",
        "nextLink": "//div[contains(concat(\" \",@class,\" \"),\" pagination \")]/a[contains(text(),\"Next\")]",
        "pageElement": "id(\"posts\")/div[contains(concat(\" \",@class,\" \"),\" list \")]/ul/li"
    },

    // ========= �����õ� ================
    {name: 'bookcool-С˵�ϼ�',
        url: '^http://www\\.bookcool\\.com/.*\\.htm',
        nextLink: '//div[@id="object1"]/descendant::a[last()][@href]',
        pageElement: '//div[@align="center"]/table[@width !="100%"]',
    },
    {name: 'Hachiya Makoto',
        url: '^http://g\\.e-hentai\\.org/s/.*$',
        nextLink: '//img[@src="http://ehgt.org/g/n.png"]/..',
        pageElement: '//body/div[@class="sni"]',
        exampleUrl: 'http://g.e-hentai.org/s/2221a78fe2/592744-3',
        useiframe: true
    },
];

//ͳ�����..�������һЩDZ.����phpwind��̳ϵͳ..�������..���ȼ��Զ���Ϊ���..
var SITEINFO_TP=[
    {name: 'Discuz ��̳ - ����',
        url: '^https?://bbs\\.[a-z]+\\.cn/search\\.php\\?mod=forum',
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]',
        autopager: {
            pageElement:'//div[@id="threadlist"]',
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]'
        }
    },
    {name: "Discuz ��̳ - ����",
        url: /^https?:\/\/(?:bbs|u)\.[^\/]+\/(?:forum\.php\?mod=guide|home\.php\?mod=space)/i,
        preLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink: '//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]',
        autopager: {
            pageElement: "//div[@id='postlist'] | //form[@method='post'][@name] | //div[@id='threadlist']/div[@class='bm_c'] | //div[@class='xld xlda']",
            replaceE: '//div[@class="pg"][child::a[@class="nxt"]]'
        }
    },
    {name: 'Discuz��̳�б�',
        url:/^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:2b\/)?(?:(?:forum)|(?:showforum)|(?:viewforum)|(?:forumdisplay))+/i,
        preLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href] | //div[@class="p_bar"]/a[@class="p_curpage"]/following-sibling::a[@class="p_num"]',
        autopager:{
            pageElement:'//form[@method="post"][@name] | //div[@id="postlist"]',
            replaceE: '//div[@class="pages" or @class="pg"][child::a[@class="next" or @class="nxt"][@href]]',
            lazyImgSrc: 'file|pagespeed_lsc_url'
        }
    },
    {name: 'Discuz��̳����',
        url:/https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:2b\/)?(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))+/i,
        preLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="prev"][@href]',
        nextLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href] | //div[@class="p_bar"]/descendant::a[text()="??"]',
        autopager:{
            pageElement:'//div[@id="postlist"] | //form[@method="post"][@name]',
            replaceE: '//div[@class="pages" or @class="pg"][child::a[@class="next" or @class="nxt"][@href]]',
            lazyImgSrc: 'zoomfile',
            stylish: '.mbbs_code{font-family:Monaco,Consolas,"Lucida Console","Courier New",serif;font-size:12px;line-height:1.8em;list-style-type:decimal-leading-zero;padding-left:10px;background:none repeat scroll 0 0 #f7f7f7;color:#666;border:1px solid #ccc;overflow:hidden;padding:10px 0 5px 10px}',
            filter: function(pages){
                // �ظ�����뵽���һҳ
                var replays = document.querySelectorAll("#postlistreply");
                if(replays.length > 1){
                    var first = replays[0];
                    first.parentNode.removeChild(first);
                }

                // �ڿ�����̳��������ڣ�����ʾ������Ĭ�Ͻ���
                // var SyntaxHighlighter = unsafeWindow.SyntaxHighlighter;
                // if (SyntaxHighlighter && SyntaxHighlighter.highlight) {
                //     SyntaxHighlighter.highlight();
                // }
            },
            documentFilter: function(doc) {
                // ������̳����һҳ������������޷���ɫ�������ֶ��޸Ĳ������ʽ
                var pres = doc.querySelectorAll('pre[class^="brush:"]');
                [].forEach.call(pres, function(pre){
                    pre.classList.add('mbbs_code');
                });
            }
        }
    },
    {name: 'phpWind��̳�б�',
        url:/^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)?thread/i,
        preLink:'//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink:'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
        autopager:{
            pageElement:'//div[@class="t z"] | //div[@class="z"] | //div[@id="ajaxtable"]',
        }
    },
    {name: 'phpWind��̳����',
        url:/^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)?read/i,
        preLink:'//div[starts-with(@class,"pages")]/b[1]/preceding-sibling::a[1][not(@class)][@href] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/preceding-sibling::li/a[1][not(@class)][@href]',
        nextLink:'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
        autopager:{
            pageElement:'//div[@class="t5"] | //div[@class="read_t"] | //div[@id="pw_content"]',
        }
    },
    {name: 'phpBB�б�',
        url:/^https?:\/\/[^\/]+(\/[a-z,0-9]+)?\/viewforum/i,
        siteExample:'http://www.firefox.net.cn/forum/viewforum.php?f=4',
        nextLink:'auto;',
        autopager:{
            pageElement:'(//div[@id="page-body"]/div[@class="forumbg"]|//table[@class="forumline"]|//table[@class="tablebg"])',
            //replaceE:'//fildset[@class="display-options")]',
            remain:1/3,
        }
    },
    {name: 'phpBB����',
        url:/^https?:\/\/[^\/]+(\/[a-z,0-9]+)?\/viewtopic/i,
        siteExample:'http://www.firefox.net.cn/forum/viewtopic.php?t=34339',
        nextLink:'auto;',
        autopager:{
            //pageElement:'//div[@id="page-body"]',
            pageElement:'(//div[@id="page-body"]/div[contains(@class,"post")]|//table[@class="forumline"]|//table[@class="tablebg"])',
            //replaceE:"//fildset[@class='display-options']",
        }
    },
    {name: 'phpBB Search',
        url: /^https?:\/\/forum\.[^\/]+\/search\.php/i,
        exampleUrl: 'http://forum.everedit.net/search.php?keywords=%E5%A4%A7%E7%BA%B2',
        nextLink: 'auto;',
        autopager: {
            pageElement: 'id("page-body")/div[starts-with(@class, "search post")]',
            replaceE: 'id("page-body")/ul[@class="linklist"]'
        }
    },
];

//���� oautopager�Ĺ����������,�˹�����..���ȼ����(��ͳ����򻹵�)..
//����˵������Ҫ�Ź��������������.
var SITEINFO_comp=[
    {name: 'discuz��̳ͨ������',
        url: '^http://[^/]+/f/(?:discuz|search)',
        nextLink: 'auto;',
        pageElement: 'id("result-items")',
    },
    {name: 'View forum - ͨ��',
        url: '^https?://.+?/viewforum\\.php\\?',
        nextLink: '//span[@class="gensmall"]/b/b/following-sibling::a[1] | (//table/tbody/tr/td[@class="nav"])[last()]/b[last()]/following-sibling::a[1]  | //div[@class="pagination"]/span/strong/following-sibling::a[1] | //a[text()="Next"]',
        pageElement: '//ul[contains(concat(" ",@class," ")," topics ")]|//form[table/@class="forumline"]',
    },
    {name: 'wiki ͨ��',
        url: '.\\?(?:.+&)?search=',
        nextLink: '//a[@class="mw-nextlink"]',
        pageElement: '//ul[@class="mw-search-results"]',
    },
    {name: 'ͨ�� Forum ����1',
        url: '^https?://.*((showthread\\.php\\?)|(forum|thread))',
        nextLink: '//a[@rel="next"]',
        pageElement: '//div[@id="posts"]|//ol[@id="posts"]/li',
        separatorReal: false
    },
    {name: 'ͨ�� Forum ����2',
        url: '^https?://[^?#]+?/showthread\\.php\\?',
        nextLink: '//tr[@valign="top"]//div[@class="pagenav"]//a[contains(text(), ">")]',
        pageElement: '(//div[@class="pagenav"])[1]|//div[@id="posts"]/node()',
        separatorReal: false
    },
    {name: 'ͨ�� Forum ����3',
        url: '^https?://.*((forumdisplay\\.php\\?)|forum)',
        nextLink: '//a[@rel="next" or (text()=">")]',
        pageElement: '//tbody[starts-with(@id,"threadbits_forum_")]/tr[td[contains(@id,"td_threadtitle")] and not(td/div/text()[contains(.,"Sticky:")])]|//ol[@id="threads" and @class="threads"]/li',
        separatorReal: false
    },
    {name: 'PHPWind 5.3.0 / 6.0.0 / 6.3.2 / 7.0.0 / 7.5.0 - View Thread',
        url: '^https?://.+/read\\.php\\?.*tid((=[0-9]+.*)|(-[0-9]+.*\\.html?))$',
        nextLink: 'auto;',
        pageElement: '//form[@name="delatc"]',
        exampleUrl: 'http://www.yydzh.com/read.php?tid=1584013',
    },
];

//��ҳ������6��ͼ��:
var sep_icons={
    top:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjM3NkQ2MTFFOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjM3NkQ2MTFGOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc2RDYxMUM5NTI2MTFERkE2REY4  RUZDQkM2QzRENTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc2RDYxMUQ5NTI2MTFERkE2  REY4RUZDQkM2QzRENTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz7bso/VAAACxElEQVR42rSUS0iUURTH//d+j9EppSRtCjEi  w0EhjR6kIyUpWilFpbUTei1auMoellAQZFSbVrkQilplhZC9IKyNQg8CXVQKZigaOgojNdg3j++7  nTtjAzPqTI50Zu7ce+ec87vnnPtgQghIcZ3VxiGwGksRhomemwGHHKqRPwl6+ujFJXHvPLwWCUyN  VT7qvZ4UtK7oQtQ8CizLUlt4fr4U6ctmExPyZ478LelcMMNIa3vL2nkrR7KnvEaR/auuZ2akeHMt  f0SGsSvFSuk5rWOzs2RvXm6+zRJBDAx+8fUNfHjZfSNwMJ4fj6ekk9KU49hYuaXAZfs4/BzvhztR  6Nxmy85aXyl1SYFdjVrViuWrmqtLj9h7R18jKPwImD6CP0V5cY09fdnKZmmzKDA55Kqqrb2u4oR9  yNOHXz4PVEWDbtPhNSfR7+lGze46u6bp7dL2n8BkmMY4umrLj6XNCA8mfn4PQ3UdNgJzGzA28xnT  1giqdh4I2UqfuGAyYGTYUbH90JrMDAcbmuqFwlWCaiGoxQwomoCmc3z1vEV6RgrbUVTmkD7Sd+GI  GVo25Ra7tjp3af3ud1C5Dk3VQ9FazI+gYkAlqKqzUP/J3Yn8vAI9N8dZIn2jUJG3olE7nJ214cGp  /U2pMnVTmLCsIN4M3UMAXrj9g1B0AUXloAixb90Z0gtYpoBh+PD4xf2ZqemJ+p5bgSdRF4SMG0bd  31Ivt50MzxUYV463pchF3L/HaE5QjVNj4JzuocJw++5Vw/SLlFmEXTKojwbTgS+LqbfgZGmKAAzL  S+Xg4ARTCc5VFhpLKEXIFn1B5E5OG+PUy4wkDCGorDHj8R+lBGAGI+iN2t3QIowlfO3ig+kjb1v4  9aI2u1lBv0Xj+GA1nlKel+q8BnANdBrCdZVNBiwXSRY8eam1PjNBxlMLZpvo2UxWOP6T/BFgAOBe  8h+hfm64AAAAAElFTkSuQmCC',
    bottom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg2RjU3NUQzOTUyNjExREY4M0U4RDZGQThBMjcwMEIzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg2RjU3NUQ0OTUyNjExREY4M0U4RDZGQThBMjcwMEIzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZGNTc1RDE5NTI2MTFERjgzRThE  NkZBOEEyNzAwQjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZGNTc1RDI5NTI2MTFERjgz  RThENkZBOEEyNzAwQjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bp+ZPAAAC0UlEQVR42rRVXUhUQRT+5t67uzdZwwX/0FKS  CCMiwcwi6QfpwcAgKHvzpR6EoKeQpIcIJCOCIB8SooIgKK2gssBwQ0PXsB8s8KdSIhFzXbHS2vbe  ufdOM3fd1mx3zRUPezgzzDnfnP3mm7mEMYaVMAkrZEq8hZ0nHQEe0hepD3RfpJlLAhagtcfPgBBA  sGWZzHbT4JEC2e4NON1UnbHkjoURiaDdf8kGpCELOncaMkF0FceKG5PnmPBVxSlBkom9iehemEN2  gYEt7/CEasLCiQKpihuLqSkhMLMAQ+ecCl5NMQ9vkqZm82glVkVZrSMy7uC5uyMT2UlCnFvV0CxY  Fps7PN6t5IZMHLB4MpER4uph86jr5GFP1wUKZd7GjelpWSWH9lenqKpL8KoyDmbolt25afBoEnic  uTBMand89uh1VeboYn71YcOvscmRxliquDf13V/i9T06sWtH+aqu8VuwJO2P3ITMUuUMPiagBoX3  w02oDje2rq3AE9/t0Fhg5LLAiM0xQ93w6JBv4H2/XpxZaXcrOBZRMVVIzAld1zmwDsPSUZi5Ha+G  Oum74Z5uUZvo8MQ/PPiir2NiZjrENnr2gnJQkxIOqkLTdA5MYVoGCtKLEJieYO2997+Imr9kE0cV  szyxvO35g9k0KQ+5KZtgaZgD1W0+s1avQwrx4K73hp0rav6VmxB9xKM2TKle1fqsJVjoKYObc6tr  YdBUlwcFni1oab8WNAytSuRGb1QUJ5GO22Z+fq339rQGS/MP2LdNIU4UrdmHx13NwW8/pupFTlJv  BbeGsclP294OvawoXV/pkoiC1/3d2ujEx6di7X+fzc/ccxaoREiN9A32Ijsn/Dq+GfCJmkruNAbe  OPf8MHD0LPNqqurivEbiFyav5shmOd7709TckBeTCsJvQ0vf+aS+GIeLTiXmeGFC8p+mqMz8V+6c  y1oWGoE/MvwtwABuklC1izbNcAAAAABJRU5ErkJggg==',
    pre:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkUzRDUyNEQ5OTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkUzRDUyNERBOTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTNENTI0RDc5MEUyMTFERkIyM0VG  NDM2QzAyN0U1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTNENTI0RDg5MEUyMTFERkIy  M0VGNDM2QzAyN0U1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I8cyJAAAC20lEQVR42tRVW0hUURTd+5xz550PVMwcUksJ  JY2wrMHpoxQzQrFRxF5iGn1EERGEZCBI9OFPUR9ZkNRX0a9fkeBPEhFBP1mDFj0xdVTSqXnce8/p  3Gtjvh+IH53LZu6Bc9dZe+2196AQAtZjEVinxWIv3stsqXM3ATG+16E1iVbBVwUsOC525pI7dfNp  gRApDnxulvvrq5KCoFgoKhLjktsOeWud5d7qhHhX0lnPBaVqVcA6J3Njp9224ZGvtMHhD7yE/vFe  UlN+PM0V52jPr6WFKwbmTJ0ZbsZYt6+k0RkIfYLByX74HvTDYLSP1FQe25KYpTzYtJel25LQ1A+T  ERcFtgenw8U47anaX5+AFh0+BN6AwizAKAX/2HPQ7OPEV+HLzSyGu1YH2JOyFSICQmi6RhYEThkx  g6oO1lXuqctIS0kn74deACOKGZwIQCn62/GnkJaZggdLDpdlVyo3RgdU0yU4x7nTu8EsasQdT36Z  Jz9nt9L3oxcoMqASFOQvF5p0HKDOBbwaeUJ2FBTQosI9ddtPWq4Z30vGuCCwEORiXkbRiZJdR6zv  JFMBXILSKXAkQlWjgmuyFrqA4K/f0PO1E0u9B5w52zaecleQRkZm9wHGWvpoe17oTFWLjVKZtkTQ  JcNu/0NQ9bAIa5M4HBkAq5MKi41gdW6L5A1E6MgnJkbVjse3hz6+Dp379ox3zWuQL8P9tqv3GqbS  YBhua+qUEER6maIajchUZQZRQwyZi4bYeqs59DMobPKI1UrRHZcB5+Wn84FN/WPW04RsNDSl0KSn  VflwWSNNFo8LRF0Thoa2gfucLNvScxdKKkalDdbGnbLluRrhhArCNVUnBNcw3fCv7xVqMc8a40eL  cIxGVHkhrn1s2hWXwdkQybAP6sYNywAvOSv3ba2VM0OTOqswGR4DlUdiXjL4rxB4NvehKx31qf+2  YmZtwXQo4siSMv53f03rBvxHgAEAqLoqsgGSMo4AAAAASUVORK5CYII=',
    next:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkY3M0ZDRTgzOTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkY3M0ZDRTg0OTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjczRkNFODE5MEUyMTFERkI2OUVB  RjVBQjI2NDU3MTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjczRkNFODI5MEUyMTFERkI2  OUVBRjVBQjI2NDU3MTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Q0swTAAAC50lEQVR42tRVXUhUQRQ+M/dnd0sN/1gtAimW  LXsoiAixFyGIHnqNioioh36ghyh6sCAijAgiIoLowSRMBG1b1n5s0XxRtiyRlIpQ1M1sKxV1XffH  e2emM+u6qG11EXzoXM6de2fOfPeb8x3OJUIIWAmjsEKmzj+UndeWrv0kAgoJWTglT0cW0vqB96L5  144bxu/Ac5sWWeHpQxfT0xq1QbY9D1SqgUJVHHWovHfE+U/GU5Mc1uQoi1cFgYbua8mPErxK8reC  Q8sGm+qACtdh6zmejnLEEGlXCC4TTAiGSeiYEVm+eGMRDhxBpes2DVQbFWQuihtsdu4gFiopY1WM  T0tgEKqmCFUnVEuCCypTwgWXdwTnloH96CylIsdtcUUloNspqDpFdAoaXhKQcYZBAqhK4ql4sVT9  tHjhINzZsN3uPnngjDMnJ18jinAQEFy3KXIQzBBE023ImOEbJ5L51eM1dooVwpgB971V8YyMgy/M  5wMfYlcantaNJ8yI8H+7LXzDVRSrSlAFiKJRITVk3ERQA9r6auF10AfRRBjqW+7Ghsf6KzMCm9yU  Q3Xf5+8PWtpfzVSsPyayVq8CioSRFGiaTpAruplMBc7CZmcZtL57kvgY7KzFvbcyAquKKoLeJPil  zq439e97etiOwv1coURWnqAE0ZOgBkjw0qJy6O17awR6/YHiQXZq7ZCRWTyptOpUIBQQtN9nnH3Z  +swfGhoVW3L3yBQTygmeykj6JmQaGh3hzYH6oBY196VE/2NV8FQj4IkoxIY64ISnyfNJjeVyd94u  MBkDw5yFjQXbQMwq4G17OGlSVoHxESt1LBaMIxODxtFGX91AsV7K12W5oTjbBQWOEvC0Vs+Yprkb  Y74ut212RcLRC43Nj0Ku3HLuLtgJnpaaaCw+fRDXui21zb+YdyoyXtrc/vgcdg3bRHjsMurZZLkf  L7XQXgahdOrhevnoFxeWxxTKcNNKEyL/3a9pxYB/CTAALMFZuEnI1jsAAAAASUVORK5CYII=',
    next_gray:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg1RDA5RjFGOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg1RDA5RjIwOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODVEMDlGMUQ5NTIyMTFERkIyQzhB  RkQ4RjhDODYwNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODVEMDlGMUU5NTIyMTFERkIy  QzhBRkQ4RjhDODYwNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz62tt8rAAACiUlEQVR42tRVS6tSURTe5/hWFAderhoIKqmI  U2eCBg2a9AOaBQ4iZxE0yCCcNYkGDYWaNEh8ICQpoYg4CJQIFA0chKGpBb7A9+Oc1jp4LnK12+GC  gxYs1j7stb79rcfeh2JZlpxCaHIiEfMLj8dzee836NlVwRRF/QKj57+LxeIh8BE5CwQChC+VRCIh  arWaiEQiTsViMQkGg+f/ZDyfz4lcLj9wiEajF2uz2UwUCgWRyWTE5/MJr/FqteIY8gqporI7SxaL  xfWbt1wuL4ClUimWgAMGYdbrNecjZJKOTgWCYzzUkYV60mh53/2MhAJ/At1iLLIDXWCTsGkATGGz  aJomDMOQ7XbLAcP+YufP62HzRqPRa5PJZPf7/edarVYC6SvwAADGOrAARmHTABgwWQqBQ6GQHA/f  bDYkHA4vjjJuNBofO51OKB6P96FJbDabZVOpFA2BLDBFxlhr7gBknM/nSalUIrPZjEQikXm73X56  FBhPBXnTbDbfFgqFqdfrZVUqFZc+KjIHthRfCmyow+EguVxuWavV3kHsq6PAyKher+PyWblcfl+p  VLZut5tBUMwdU0ZQJIDW6XSSarW6/gwyGAwe9vv94xcEa6bRaIhSqaRhrB4B0A24aXdcLhcFKXM1  RVA8AJn2ej0mnU7/gNm/u2v6X6cCJ4Hazeu81Wo9SCaT3yATxm63c+njHFssFo4x7I3A9xboRMgc  s3v2J6R3PxaLfdfr9YzRaCQGg4HodDqSSCSmwP42+LSv+2x+mUwmTwCoa7PZGFAEnU2n03uw91XQ  s3mFJMfjsTOTyTyGtWw4HD4H+0Hwe3xZrFbr/ueLbrd7Exo4hvVLIY8Q9d/9mk4G/EeAAQCBEkva  rHrRPgAAAABJRU5ErkJggg==',
    pre_gray:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjc0MTI5MDY4OTUyMjExREZCODVDREYyM0U0QjMzQkQzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjc0MTI5MDY5OTUyMjExREZCODVDREYyM0U0QjMzQkQzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzQxMjkwNjY5NTIyMTFERkI4NUNE  RjIzRTRCMzNCRDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzQxMjkwNjc5NTIyMTFERkI4  NUNERjIzRTRCMzNCRDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz5D2F5XAAACZklEQVR42tSVz6sSURTH7x0VJxX8CampSQtF  /AESConiQkhdlKKCLdr0YxW0iDaBSBLZok3tol27/oC3TcS14EpEBV24UOO5EETLn9M5g4KoPXu9  XHTgMNc7537me7/3zEg5jiOnCIacKISbQSAQuKjuI6VULhAInhSLxdWlFKMlv8mXer3+qU6nu79c  Ll/9KyvuKZXKN9FoVBqJRBRyufyZz+eLXxXslkqlXxOJhKTZbBJIBsY6mUz23uFw3P5bsEEoFH4D  kHQwGJBer0e63S7p9/tMKpW6pVarv5hMphsSiYRi8eZ6EDybzTYpg5/FeDyuYBiGtNttIhKJCBwc  aTQaZLFYMHDPZjQaP8P8NY1Gw0wmEw7nD4LH4zGmQCwWn4GnN7VaLVOv13kgqCfQFZhctVolcJg0  HA7ftdlsH2BHfJfg/YNglUqF+ekOhNPpFNVqNYKKEYpX6AhcTFerFSmXy4zL5RJ4PJ4Hbrf7La4H  xfQgGNa8sNvtD0OhkBiVYquhWoRCcvP5nEMoJu6uVCrRYDAoNZvNj6xW62MUcPAFMRgM79LpNIsF  Xq+XBxQKBYQjlIIifgzKaSwWw+0z8HCaTCbVw+HwtcViOW+1Wmd74E6nw2azWX4MgJ+5XI5F30At  nU6n/IM220VgPp//AfNYI4Yag0KheA639sHoxmYAqjiEohXo7RrKHx5CcQ6CrVQqzNFvxW6su2D7  tFfrllrtttalX+kNFPt47SlBv7Hfd9vrjxVvB8uyZOu7jX5cDez3+3mPMUejEard281R8E7h90wm  c/3IRs4vtPG/+2s6GfiXAAMAq3cXTADTBMIAAAAASUVORK5CYII=',
};

//��������״̬��ɫ.
var FWKG_color={
    loading:'#8B00E8',    // ��ȡ��״̬
    prefetcher:'#5564AF', // Ԥ��״̬
    autopager:'#038B00',  // ��ҳ״̬
    Apause:'#B7B700',     // ��ҳ״̬(��ͣ).
    Astop:'#A00000',      // ��ҳ״̬(ֹͣ)(��ҳ���,���߱��쳣ֹͣ.)(�޷��ٿ���)
    dot:'#00FF05',        // ��ȡ���,����ʾһ��С��,��ôС�����ɫ.
};

//��û���ҵ������ʱ��,�����Զ�����ģʽ.
//��û�и߼��������վ��.��һЩ����..
var autoMatch={
    keyMatch:true,              //�Ƿ����ùؼ���ƥ��
        cases:false,            //�ؼ������ִ�Сд....
        digitalCheck:true,      //���������ӽ��м��,�����ҳ���һҳ������
        pfwordl:{               //�ؼ���ǰ����ַ��޶�.
            previous:{          //��һҳ�ؼ���ǰ����ַ�,���� "��һҳ" Ҫƥ�� "[��һҳ" ,��ôprefixҪ������Ҫ��С��1,����characterҪ�����ַ� "["
                enable:true,
                maxPrefix:3,
                character:[' ','��','[','��','<','��','?','?','<<','��','��','��','(','��']
            },
            next:{//��һҳ�ؼ���ǰ����ַ�
                enable:true,
                maxPrefix:2,
                character:[' ','��','[','��','��','��','��','(']
            }
        },
        sfwordl:{               //�ؼ��ֺ�����ַ��޶�.
            previous:{          //��һҳ�ؼ��ֺ�����ַ�
                enable:true,
                maxSubfix:2,
                character:[' ','��',']','��','��','��','��',')']
            },
            next:{              //��һҳ�ؼ��ֺ�����ַ�
                enable:true,
                maxSubfix:3,
                character:[' ','��',']','��','>','��','?','?','>>','��','��','��',')','��']
            }
        },
    useiframe: GM_getValue('SITEINFO_D.useiframe') || false,            //(Ԥ��)�Ƿ�ʹ��iframe..
    viewcontent: false,          //�鿴Ԥ��������,��ʾ��ҳ������·�.
    FA: {                       //ǿ��ƴ�� ѡ�� ��������.
        enable:false,           //Ĭ������ ǿ��ƴ��
        manualA:false,          //�ֶ���ҳ.
        useiframe:false,        //(��ҳ)�Ƿ�ʹ��iframe..
            iloaded:false,      //(ֻ��opera��Ч)���ʹ��iframe��ҳ..�Ƿ���iframe��ȫload�����..������DOM��ɺ����
            itimeout:0,         //��ʹ��iframe��ҳʱ����ɺ�����ȴ����ٺ����,�ڲ���..
        remain:1,               //ʣ��ҳ��ĸ߶�..����ʾ�߶ȵ� remain ����ʼ��ҳ..
        maxpage:99,             //��෭����ҳ..
        ipages:[false,2],       //������ҳ,��һ���ǿ����Ƿ���js���ص�ʱ���������ڶ���(����С��maxpage)��ҳ��,����[true,3].����˵JS���غ�.������3ҳ.
        separator:true,         //��ʾ��ҳ����..(�Ƽ���ʾ.)..
    }
};

//��һҳ�ؼ���
var prePageKey=[
    '��һҳ', '��һ�', '��1ҳ', '��1�', '��ҳ', '���',
    '�����', '����ҳ',
    '��һ��', '��һ��', '��һ��', '��һ��', '��һ��', '��һ��', '��һƪ',
    'ǰһҳ', 'ǰһ�',
    '����', '����', '��ƪ',
    'previous', 'previous Page', 'ǰ��', 'ǰ�Υک`��'
];

//��һҳ�ؼ���
var nextPageKey=[
    '��һҳ', '��һ�', '��1ҳ', '��1�', '��ҳ', '���',
    '��ҳ', '���', '�����', '����ҳ',
    '��һ��', '��һ��', '��һ��', '��һ��', '��һ��', '��һ��', '��һƪ',
    '��һҳ', '��һ�',
    'ǰ��', '��ƪ', '��ҳ', '����',
    'Next', 'Next Page', '�Τ�', '�ΤΥک`��'
];

// �����Զ���ҳ��Ϣ������ʾ��ʵ���ҳ����Ϣ��һ��������ʶ��������������վ�㲻��ʶ�𣬿��԰ѵ�ַ�������ַ����ӵ�����
// ��ò�Ҫ�Ҽӣ�һЩ�����ɵ�վ����ʾ����������Ҳû������
var REALPAGE_SITE_PATTERN = ['search?', 'search_', 'forum', 'thread'];


//------------------------����Ĳ�Ҫ����-----------------
///////////////////////////////////////////////////////////////////


//----------------------------------
var setup = function(){
    var d = document;
    var on = function(node, e, f) {
        node.addEventListener(e, f, false);
    };

    var $ = function(s) { return d.getElementById('sp-prefs-'+s); };
    if($('setup')) return;

    var styleNode = GM_addStyle('\
        #sp-prefs-setup { position:fixed;z-index:2147483647;top:30px;right:60px;padding:20px 30px;background:#eee;width:500px;border:1px solid black; }\
        #sp-prefs-setup * { color:black;text-align:left;line-height:normal;font-size:12px; }\
        #sp-prefs-setup a { color:black;text-decoration:underline; }\
        #sp-prefs-setup div { text-align:center;font-weight:bold;font-size:14px; }\
        #sp-prefs-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:#eee;border:0; }\
        #sp-prefs-setup input, #sp-prefs-setup select { border:1px solid gray;padding:2px;background:white; }\
        #sp-prefs-setup li { margin:0;padding:6px 0;vertical-align:middle;background:#eee;border:0 }\
        #sp-prefs-setup button { width:150px;margin:0 10px;text-align:center;}\
        #sp-prefs-setup textarea { width:98%; height:60px; margin:3px 0; }\
        #sp-prefs-setup b { font-weight: bold; font-family: "΢���ź�", sans-serif; }\
        #sp-prefs-setup button:disabled { color: graytext; }\
    ');

    var div = d.createElement('div');
    div.id = 'sp-prefs-setup';
    d.body.appendChild(div);
    div.innerHTML = '\
        <div>Super_preloaderPlus_one_New����</div>\
            <ul>\
                <li>��ǰ�汾Ϊ <b>' + scriptInfo.version + ' </b>���ϴθ���ʱ��Ϊ <b>'+ scriptInfo.updateTime + '</b>\
                    <a id="sp-prefs-homepageURL" target="_blank" href="' + scriptInfo.homepageURL + '"/>�ű���ҳ</a>\
                </li>\
                <li><input type="checkbox" id="sp-prefs-debug" /> ����ģʽ</li>\
                <li><input type="checkbox" id="sp-prefs-dblclick_pause" /> ���˫����ͣ��ҳ��Ĭ��Ϊ Ctrl + ���������</li>\
                <li><input type="checkbox" id="sp-prefs-enableHistory" /> �����һҳ����ʷ��¼</li>\
                <li title="��һҳ���������ó����±�ǩҳ��"><input type="checkbox" id="sp-prefs-forceTargetWindow" /> �±�ǩ������</li>\
                <li><input type="checkbox" id="sp-prefs-SITEINFO_D-useiframe" /> ��Ԥ��ģʽ�£�Ĭ������ iframe ��ʽ</li>\
                <li><input type="checkbox" id="sp-prefs-SITEINFO_D-a_enable" /> Ĭ�������Զ���ҳ </li>\
                <li><input type="checkbox" id="sp-prefs-SITEINFO_D-a_force_enable" /> �Զ���ҳĬ������ǿ��ƴ��</li>\
                <li>�Զ����ų��б�\
                    <div><textarea id="sp-prefs-excludes" placeholder="�Զ����ų��б�֧��ͨ�����\n���磺http://*.douban.com/*"></textarea></div>\
                </li>\
                <li>�Զ���վ�����\
                    <div><textarea id="sp-prefs-custom_siteinfo" placeholder="�Զ���վ�����"></textarea></div>\
                </li>\
            </ul>\
        <div><button id="sp-prefs-ok">ȷ��</button><button id="sp-prefs-cancel">ȡ��</button></div>';
    div = null;

    var close = function() {
        if (styleNode) {
            styleNode.parentNode.removeChild(styleNode);
        }
        var div = $('setup');
        div.parentNode.removeChild(div);
    };

    on($('ok'), 'click', function(){
        GM_setValue('enableHistory', prefs.enableHistory = !!$('enableHistory').checked);
        GM_setValue('forceTargetWindow', prefs.forceTargetWindow = !!$('forceTargetWindow').checked);
        GM_setValue('SITEINFO_D.useiframe', SITEINFO_D.useiframe = !!$('SITEINFO_D-useiframe').checked);
        GM_setValue('SITEINFO_D.autopager.enable', SITEINFO_D.autopager.enable = !!$('SITEINFO_D-a_enable').checked);
        GM_setValue('SITEINFO_D.autopager.force_enable', SITEINFO_D.autopager.force_enable = !!$('SITEINFO_D-a_force_enable').checked);

        GM_setValue('debug', xbug = !!$('debug').checked);
        debug = xbug ? console.log.bind(console) : function() {};

        GM_setValue('dblclick_pause', $('dblclick_pause').checked);
        GM_setValue('excludes', prefs.excludes = $('excludes').value);
        GM_setValue('custom_siteinfo', prefs.custom_siteinfo = $('custom_siteinfo').value);

        SP.loadSetting();

        close();
    });

    on($('cancel'), 'click', close);

    $('debug').checked = xbug;
    $('enableHistory').checked = prefs.enableHistory;
    $('forceTargetWindow').checked = prefs.forceTargetWindow;
    $('dblclick_pause').checked = GM_getValue('dblclick_pause') || false;
    $('SITEINFO_D-useiframe').checked = SITEINFO_D.useiframe;
    $('SITEINFO_D-a_enable').checked = SITEINFO_D.autopager.enable;
    $('SITEINFO_D-a_force_enable').checked = SITEINFO_D.autopager.force_enable;
    $('excludes').value = prefs.excludes;
    $('custom_siteinfo').value = prefs.custom_siteinfo;

};

var isUpdating = true;
function checkUpdate(button) {
    if (isUpdating) {
        return;
    }

    button.innerHTML = '���ڸ�����...';
    button.disabled = 'disabled';

    var reset = function() {
    	isUpdating = false;
    	button.innerHTML = '���ϸ���';
    	button.disabled = '';
    };

    GM_xmlhttpRequest({
        method: "GET",
        url: scriptInfo.metaUrl,
        onload: function(response) {
            var txt = response.responseText;
            var curVersion = scriptInfo.version;
            var latestVersion = txt.match(/@\s*version\s*([\d\.]+)\s*/i);
            if (latestVersion) {
                latestVersion = latestVersion[1];
            } else {
                alert('�����汾�Ŵ���');
                return;
            }

            //�ԱȰ汾��
            var needUpdate;
            var latestVersions = latestVersion.split('.');
            var lVLength = latestVersions.length;
            var currentVersion = curVersion.split('.');
            var cVLength = currentVersion.length;
            var lV_x;
            var cV_x;
            for (var i = 0; i < lVLength; i++) {
                lV_x = Number(latestVersions[i]);
                cV_x = (i >= cVLength) ? 0 : Number(currentVersion[i]);
                if (lV_x > cV_x) {
                    needUpdate = true;
                    break;
                } else if (lV_x < cV_x) {
                    break;
                }
            }

            if (needUpdate) {
                alert('���ű��Ӱ汾 ' + scriptInfo.version + '  ���µ��˰汾 ' + latestVersion + '.\n�����ű���ҳ���а�װ');
                document.getElementById("sp-prefs-homepageURL").boxShadow = '0 0 2px 2px #FF5555';
            }

            reset();
        }
    });

	setTimeout(reset, 30 * 1000);
}


//----------------------------------
// main.js

//------------------------����Ĳ�Ҫ����-----------------
///////////////////////////////////////////////////////////////////

var xbug = prefs.debug || GM_getValue("debug") || false;
var C = console;
var debug = xbug ? console.log.bind(console) : function() {};

// ����
var isHashchangeSite = false,
    hashchangeTimer = 0;

var SP = {
    init: function() {
        if(document.body.getAttribute("name") === "MyNovelReader"){
            return;
        }

        this.loadSetting();

        GM_registerMenuCommand('Super_preloaderPlus_one_New ����', setup);

        // �����Ƿ���ҳ�治ˢ�µ�վ��
        var locationHref = location.href;
        var hashSite = _.find(HashchangeSites, function(x){ return toRE(x.url).test(locationHref); });
        if (hashSite) {
            isHashchangeSite = true;
            hashchangeTimer = hashSite.timer;
            debug('��ǰ��ҳ�治ˢ�µ�վ��', hashSite);
            setTimeout(function() {
                init(window, document);
            }, hashchangeTimer);
        } else {
            init(window, document);
        }

        // �ֱ��� �߶� > ��� �����ֻ�
        if(window.screen.height > window.screen.width){
            GM_addStyle('div.sp-separator { min-width:auto !important; }');
        }
    },
    loadSetting: function(){
        var a_enable = GM_getValue('SITEINFO_D.autopager.enable');
        if (a_enable !== undefined) {
            SITEINFO_D.autopager.enable = a_enable;
        }

        var loadDblclickPause = function(reload){
            var dblclickPause = GM_getValue('dblclick_pause', prefs.dblclick_pause);
            if (dblclickPause) {
                prefs.mouseA = false;
                prefs.Pbutton = [0, 0, 0];
            }

            if (reload) location.reload();
        };

        var loadCustomSiteInfo = function() {
            var infos;
            try {
                infos = new Function('', 'return ' + prefs.custom_siteinfo)();
            }catch(e) {
                console.error('�Զ���վ��������', prefs.custom_siteinfo);
                // alert('�Զ���վ��������');
            }

            if (_.isArray(infos)) {
                SITEINFO = infos.concat(SITEINFO);
            }
        };

        loadDblclickPause();

        loadCustomSiteInfo();
    },
};


function init(window, document) {
    var startTime = new Date();

    var nullFn = function() {}; //�պ���.
    var url = document.location.href.replace(/#.*$/, ''); //url ȥ��hash
    var cplink = url;  // �������������ҳ���url;
    var domain = document.domain; //ȡ������.
    var domain_port = url.match(/https?:\/\/([^\/]+)/)[1]; //�˿ں�����,������֤�Ƿ����.

    // �¼ӵģ���ʾ����
    var remove = [];  // ��Ҫ�Ƴ����¼�

    debug('----------------------------------------------------');

    //������
    var floatWO = {
        updateColor: nullFn,
        loadedIcon: nullFn,
        CmodeIcon: nullFn,
    };

    function floatWindow() {
        GM_addStyle('\
            #sp-fw-container {\
                z-index:999999!important;\
                text-align:left!important;\
            }\
            #sp-fw-container * {\
                font-size:13px!important;\
                color:black!important;\
                float:none!important;\
            }\
            #sp-fw-main-head{\
                position:relative!important;\
                top:0!important;\
                left:0!important;\
            }\
            #sp-fw-span-info{\
                position:absolute!important;\
                right:1px!important;\
                top:0!important;\
                font-size:10px!important;\
                line-height:10px!important;\
                background:none!important;\
                font-style:italic!important;\
                color:#5a5a5a!important;\
                text-shadow:white 0px 1px 1px!important;\
            }\
            #sp-fw-container input {\
                vertical-align:middle!important;\
                display:inline-block!important;\
                outline:none!important;\
                height: auto !important;\
                padding: 0px !important;\
                margin-bottom: 0px !important;\
            }\
            #sp-fw-container input[type="number"] {\
                width:50px!important;\
                text-align:left!important;\
            }\
            #sp-fw-container input[type="checkbox"] {\
                border:1px solid #B4B4B4!important;\
                padding:1px!important;\
                margin:3px!important;\
                width:13px!important;\
                height:13px!important;\
                background:none!important;\
                cursor:pointer!important;\
                visibility: visible !important;\
                position: static !important;\
            }\
            #sp-fw-container input[type="button"] {\
                border:1px solid #ccc!important;\
                cursor:pointer!important;\
                background:none!important;\
                width:auto!important;\
                height:auto!important;\
            }\
            #sp-fw-container li {\
                list-style:none!important;\
                margin:3px 0!important;\
                border:none!important;\
                float:none!important;\
            }\
            #sp-fw-container fieldset {\
                border:2px groove #ccc!important;\
                -moz-border-radius:3px!important;\
                border-radius:3px!important;\
                padding:4px 9px 6px 9px!important;\
                margin:2px!important;\
                display:block!important;\
                width:auto!important;\
                height:auto!important;\
            }\
            #sp-fw-container legend {\
                line-height: 20px !important;\
                margin-bottom: 0px !important;\
            }\
            #sp-fw-container fieldset>ul {\
                padding:0!important;\
                margin:0!important;\
            }\
            #sp-fw-container ul#sp-fw-a_useiframe-extend{\
                padding-left:40px!important;\
            }\
            #sp-fw-rect {\
                position:relative!important;\
                top:0!important;\
                left:0!important;\
                float:right!important;\
                height:10px!important;\
                width:10px!important;\
                padding:0!important;\
                margin:0!important;\
                -moz-border-radius:3px!important;\
                border-radius:3px!important;\
                border:1px solid white!important;\
                -webkit-box-shadow:inset 0 5px 0 rgba(255,255,255,0.3), 0 0 3px rgba(0,0,0,0.8)!important;\
                -moz-box-shadow:inset 0 5px 0 rgba(255,255,255,0.3), 0 0 3px rgba(0,0,0,0.8)!important;\
                box-shadow:inset 0 5px 0 rgba(255,255,255,0.3), 0 0 3px rgba(0,0,0,0.8)!important;\
                opacity:0.8!important;\
            }\
            #sp-fw-dot,\
            #sp-fw-cur-mode {\
                position:absolute!important;\
                z-index:9999!important;\
                width:5px!important;\
                height:5px!important;\
                padding:0!important;\
                -moz-border-radius:3px!important;\
                border-radius:3px!important;\
                border:1px solid white!important;\
                opacity:1!important;\
                -webkit-box-shadow:inset 0 -2px 1px rgba(0,0,0,0.3),inset 0 2px 1px rgba(255,255,255,0.3), 0px 1px 2px rgba(0,0,0,0.9)!important;\
                -moz-box-shadow:inset 0 -2px 1px rgba(0,0,0,0.3),inset 0 2px 1px rgba(255,255,255,0.3), 0px 1px 2px rgba(0,0,0,0.9)!important;\
                box-shadow:inset 0 -2px 1px rgba(0,0,0,0.3),inset 0 2px 1px rgba(255,255,255,0.3), 0px 1px 2px rgba(0,0,0,0.9)!important;\
            }\
            #sp-fw-dot{\
                right:-3px!important;\
                top:-3px!important;\
            }\
            #sp-fw-cur-mode{\
                left:-3px!important;\
                top:-3px!important;\
                width:6px!important;\
                height:6px!important;\
            }\
            #sp-fw-content{\
                padding:0!important;\
                margin:5px 5px 0 0!important;\
                -moz-border-radius:3px!important;\
                border-radius:3px!important;\
                border:1px solid #A0A0A0!important;\
                -webkit-box-shadow:-2px 2px 5px rgba(0,0,0,0.3)!important;\
                -moz-box-shadow:-2px 2px 5px rgba(0,0,0,0.3)!important;\
                box-shadow:-2px 2px 5px rgba(0,0,0,0.3)!important;\
            }\
            #sp-fw-main {\
                padding:5px!important;\
                border:1px solid white!important;\
                -moz-border-radius:3px!important;\
                border-radius:3px!important;\
                background-color:#F2F2F7!important;\
                background: -moz-linear-gradient(top, #FCFCFC, #F2F2F7 100%)!important;\
                background: -webkit-gradient(linear, 0 0, 0 100%, from(#FCFCFC), to(#F2F2F7))!important;\
            }\
            #sp-fw-foot{\
             position:relative!important;\
             left:0!important;\
             right:0!important;\
             min-height:20px!important;\
            }\
            #sp-fw-savebutton{\
                position:absolute!important;\
                top:0!important;\
                right:2px!important;\
            }\
            #sp-fw-container .sp-fw-spanbutton{\
                border:1px solid #ccc!important;\
                -moz-border-radius:3px!important;\
                border-radius:3px!important;\
                padding:2px 3px!important;\
                cursor:pointer!important;\
                background-color:#F9F9F9!important;\
                -webkit-box-shadow:inset 0 10px 5px white!important;\
                -moz-box-shadow:inset 0 10px 5px white!important;\
                box-shadow:inset 0 10px 5px white!important;\
            }\
        ');

        var div = document.createElement('div');
        div.id = 'sp-fw-container';
        div.innerHTML = '\
            <div id="sp-fw-rect" style="background-color:#000;">\
                <div id="sp-fw-dot" style="display:none;"></div>\
                <div id="sp-fw-cur-mode" style="display:none;"></div>\
            </div>\
            <div id="sp-fw-content" style="display:none;">\
                <div id="sp-fw-main">\
                    <div id="sp-fw-main-head">\
                        <input type="checkbox" title="ʹ�÷�ҳģʽ,����ʹ��Ԥ��ģʽ" id="sp-fw-a_enable" name="sp-fw-a_enable"/>ʹ�÷�ҳģʽ\
                        <span id="sp-fw-span-info">Super_preloader</span>\
                    </div>\
                    <fieldset>\
                        <legend title="Ԥ��ģʽ���������" >Ԥ������</legend>\
                        <ul>\
                            <li>\
                                <input type="checkbox" title="ʹ��iframeԤ���������һҳ������,����ʹ��xhr������һҳԴ��,ȡ�����е�ͼƬ����Ԥ��" id="sp-fw-useiframe" name="sp-fw-useiframe"/>ʹ��iframe��ʽ\
                            </li>\
                            <li>\
                                <input type="checkbox" title="�鿴Ԥ��������,������ʾ��ҳ��ĵײ�,����Ԥ����Щʲô." id="sp-fw-viewcontent" name="sp-fw-viewcontent"/>�鿴Ԥ��������\
                            </li>\
                        </ul>\
                    </fieldset>\
                    <fieldset id="sp-fw-autopager-field" style="display:block;">\
                        <legend title="�Զ���ҳģʽ���������">��ҳ����</legend>\
                        <ul>\
                            <li>\
                                <input type="checkbox" title="ʹ��iframe��ʽ���з�ҳ,����ʹ��xhr��ʽ��ҳ,���Խ��ĳЩ��ҳxhr��ʽ�޷���ҳ������,���xhr��ҳ�����Ļ�,�Ͳ�Ҫ�������." id="sp-fw-a_useiframe" name="sp-fw-a_useiframe"/>ʹ��iframe��ʽ</input>\
                                <input type="checkbox" title="ÿ����һҳ�����µ�iframe�����Խ����һҳͼƬ��ť���������" id="sp-fw-a_newIframe" name="sp-fw-a_newIframe">��iframe</input>\
                                <ul id="sp-fw-a_useiframe-extend">\
                                    <li>\
                                        <input type="checkbox" title="�ȴ�iframe��ȫ�����(����load�¼�),������ȡ��,������DOM��ɺ�,��ֱ��ȡ����..(���Ϻ�,��Ƚ���,���ǿ��ܻ���һЩ����.)" id="sp-fw-a_iloaded" name="sp-fw-a_iloaded" />�ȴ�iframe��ȫ����\
                                    </li>\
                                    <li>\
                                        <input type="number"  min="0" title="�ڿ��Դ�iframeȡ���ݵ�ʱ��,�����ȴ��趨�ĺ���ſ�ʼȡ������(����Ϊ������ҳ׼��,�������,������Ϊ0)" id="sp-fw-a_itimeout" name="sp-fw-a_itimeout"/>ms��ʱȡ��\
                                    </li>\
                                </ul>\
                            </li>\
                            <li>\
                                <input type="checkbox" id="sp-fw-a_manualA" name="sp-fw-a_manualA" title="�����Զ�ƴ������,�����һ�����Ʒ�ҳ�����ĵ�ͼ��,�����ҳ(����̳����������ҳ��,���Կ��ǹ�ѡ����,�Ӷ���Ӱ����Ļ���)"/>�ֶ�ģʽ\
                            </li>\
                            <li>\
                                 ʣ��<input type="number" min="0" id="sp-fw-a_remain" name="sp-fw-a_remain" title="��ʣ���ҳ��ĸ߶���������ɼ����ڸ߶ȵļ�����ʼ��ҳ"/>��ҳ��߶ȴ���\
                            </li>\
                            <li>\
                                 ��෭<input type="number" min="0" id="sp-fw-a_maxpage" name="sp-fw-a_maxpage" title="��෭ҳ����,���ﵽ�����ҳ������ʱ��,�Զ���ҳֹͣ." />ҳ\
                            </li>\
                            <li>\
                                <input type="checkbox" id="sp-fw-a_separator" name="sp-fw-a_separator" title="�ָ�ҳ����Ҫ���ݵĵ�����,���Խ���ҳ����Ҫ����֮��Ŀ�����ת��λ��."/>��ʾ��ҳ����\
                            </li>\
                            <li>\
                                <input type="checkbox" title="����һҳ��body������������ƴ������.(���跭ҳ����վû�и߼�����ʱ,����ǿ�ƹ�ѡ,�޷�ȡ��.)" id="sp-fw-a_force" name="sp-fw-a_force"/>ǿ��ƴ��\
                            </li>\
                            <li>\
                                <input type="checkbox" id="sp-fw-a_ipages_0" name="sp-fw-a_ipages_0" title="��JS���غ�,���������������趨��ҳ��"/>���� \
                                ������<input type="number" min="1" id="sp-fw-a_ipages_1" name="sp-fw-a_ipages_1" title="������ҳ������" />ҳ\
                                <input type="button" value="��ʼ" title="����������ʼ������ҳ" id="sp-fw-a_starti" />\
                            </li>\
                        </ul>\
                    </fieldset>\
                    <div id="sp-fw-foot">\
                     <input type="checkbox" id="sp-fw-enable" title="�ܿ���,����js,�������." name="sp-fw-enable"/>����\
                     <span id="sp-fw-setup" class="sp-fw-spanbutton" title="�����ô���">����</span>\
                     <span id="sp-fw-savebutton" class="sp-fw-spanbutton" title="��������">����</span>\
                    </div>\
                </div>\
            </div>\
        ';
        document.body.appendChild(div);

        function $(id) {
            return document.getElementById(id);
        }

        var rect = $('sp-fw-rect'); //��������С������,����ɫ������ǰ��״̬.
        var spanel = $('sp-fw-content'); //�������.

        var spanelc = {
            show: function() {
                spanel.style.display = 'block';
            },
            hide: function() {
                spanel.style.display = 'none';
            },
        };
        var rectt1, rectt2;
        //�����������
        rect.addEventListener('mouseover', function(e) {
            rectt1 = setTimeout(spanelc.show, 100);
        }, false);
        rect.addEventListener('mouseout', function(e) {
            clearTimeout(rectt1);
        }, false);

        div.addEventListener('mouseover', function(e) {
            clearTimeout(rectt2);
        }, false);

        div.addEventListener('mouseout', function(e) {
            if (e.relatedTarget && e.relatedTarget.disabled) return; //for firefox and chrome
            rectt2 = setTimeout(spanelc.hide, 288);
        }, false);

        var dot = $('sp-fw-dot'); //������ɺ�,��ʾ��С��
        dot.style.backgroundColor = FWKG_color.dot;

        var cur_mode = $('sp-fw-cur-mode'); //������״̬ʱ,����������ǰ�Ƿ�ҳģʽ,����Ԥ��ģʽ.
        cur_mode.style.backgroundColor = SSS.a_enable ? FWKG_color.autopager : FWKG_color.prefetcher;

        var a_enable = $('sp-fw-a_enable'); //���÷�ҳģʽ
        var autopager_field = $('sp-fw-autopager-field'); //��ҳ��������

        //Ԥ������
        var useiframe = $('sp-fw-useiframe');
        var viewcontent = $('sp-fw-viewcontent');

        //��ҳ����
        var a_useiframe = $('sp-fw-a_useiframe');
        var a_iloaded = $('sp-fw-a_iloaded');
        var a_itimeout = $('sp-fw-a_itimeout');
        var a_manualA = $('sp-fw-a_manualA');
        var a_remain = $('sp-fw-a_remain');
        var a_maxpage = $('sp-fw-a_maxpage');
        var a_separator = $('sp-fw-a_separator');
        var a_ipages_0 = $('sp-fw-a_ipages_0');
        var a_ipages_1 = $('sp-fw-a_ipages_1');
        var a_force = $('sp-fw-a_force');

        // newIframe �����ĵ��
        var a_newIframe = $('sp-fw-a_newIframe');
        a_newIframe.addEventListener('click', function(){
            a_useiframe.checked = a_newIframe.checked;
        }, false);

        var a_starti = $('sp-fw-a_starti'); //��ʼ������ҳ
        a_starti.addEventListener('click', function() {
            if (this.disabled) return;
            var value = Number(a_ipages_1.value);
            if (isNaN(value) || value <= 0) {
                value = SSS.a_ipages[1];
                a_ipages_1.value = value;
            }
            autoPO.startipages(value);
        }, false);

        //�ܿ���
        var enable = $('sp-fw-enable');
        $('sp-fw-setup').addEventListener('click', setup, false);

        // �������ð�ť.
        var savebutton = $('sp-fw-savebutton');
        savebutton.addEventListener('click', function(e) {
            var value = {
                Rurl: SSS.Rurl,
                useiframe: gl(useiframe),
                viewcontent: gl(viewcontent),
                enable: gl(enable),
            };

            function gl(obj) {
                return (obj.type == 'checkbox' ? obj.checked : obj.value);
            }
            if (SSS.a_enable !== undefined) {
                value.a_enable = gl(a_enable);
                value.a_useiframe = gl(a_useiframe);
                value.a_newIframe = gl(a_newIframe);
                value.a_iloaded = gl(a_iloaded);
                value.a_manualA = gl(a_manualA);
                value.a_force = gl(a_force);
                var t_a_itimeout = Number(gl(a_itimeout));
                value.a_itimeout = isNaN(t_a_itimeout) ? SSS.a_itimeout : (t_a_itimeout >= 0 ? t_a_itimeout : 0);
                var t_a_remain = Number(gl(a_remain));
                value.a_remain = isNaN(t_a_remain) ? SSS.a_remain : Number(t_a_remain.toFixed(2));
                var t_a_maxpage = Number(gl(a_maxpage));
                value.a_maxpage = isNaN(t_a_maxpage) ? SSS.a_maxpage : (t_a_maxpage >= 1 ? t_a_maxpage : 1);
                var t_a_ipages_1 = Number(gl(a_ipages_1));
                value.a_ipages = [gl(a_ipages_0), (isNaN(t_a_ipages_1) ? SSS.a_ipages[1] : (t_a_ipages_1 >= 1 ? t_a_ipages_1 : 1))];
                value.a_separator = gl(a_separator);
            }
            //alert(xToString(value));
            SSS.savedValue[SSS.sedValueIndex] = value;
            //alert(xToString(SSS.savedValue));
            saveValue('spfwset', xToString(SSS.savedValue));
            if ((e.shiftKey ? !prefs.FW_RAS : prefs.FW_RAS)) { //��סshift��,ִ�з������.
                setTimeout(function(){
                    location.reload();
                }, 1);
            }
        }, false);

        function ll(obj, value) {
            if (obj.type == 'checkbox') {
                obj.checked = value;
            } else {
                obj.value = value;
            }
        }

        //���뷭ҳ����.
        if (SSS.a_enable === undefined) { //δ���巭ҳ����.
            a_enable.disabled = true;
            autopager_field.style.display = 'none';
        } else {
            ll(a_enable, SSS.a_enable);
            ll(a_useiframe, SSS.a_useiframe);
            ll(a_newIframe, SSS.a_newIframe);
            ll(a_iloaded, SSS.a_iloaded);
            ll(a_itimeout, SSS.a_itimeout);
            ll(a_manualA, SSS.a_manualA);
            ll(a_force, SSS.a_force);
            ll(a_remain, SSS.a_remain);
            ll(a_maxpage, SSS.a_maxpage);
            ll(a_separator, SSS.a_separator);
            ll(a_ipages_0, SSS.a_ipages[0]);
            ll(a_ipages_1, SSS.a_ipages[1]);
        }

        if (!SSS.a_enable) { //��ǰ���Ƿ�ҳģʽ,����������ҳ��ť.
            a_starti.disabled = true;
        }

        if (!SSS.hasRule) { //���û�и߼�����,��ô����������.
            a_force.disabled = true;
        }

        //����Ԥ������.
        ll(useiframe, SSS.useiframe);
        ll(viewcontent, SSS.viewcontent);

        //�ܿ���
        ll(enable, SSS.enable);

        var FWKG_state = {
            loading: '��ȡ��״̬',
            prefetcher: 'Ԥ��״̬',
            autopager: '��ҳ״̬',
            Apause: '��ҳ״̬(��ͣ)',
            Astop: '��ҳ״̬(ֹͣ)(��ҳ���,���߱��쳣ֹͣ)(�޷��ٿ���)',
            dot: '��ȡ���',
        };

        floatWO = {
            updateColor: function(state) {
                rect.style.backgroundColor = FWKG_color[state];
                rect.setAttribute("title", FWKG_state[state]);
            },
            loadedIcon: function(command) {
                dot.style.display = command == 'show' ? 'block' : 'none';
            },
            CmodeIcon: function(command) {
                cur_mode.style.display = command == 'show' ? 'block' : 'none';
            },
        };


        var vertical = parseInt(prefs.FW_offset[0], 10);
        var horiz = parseInt(prefs.FW_offset[1], 10);
        var FW_position = prefs.FW_position;

        // ��opera��fixed��λ.
        div.style.position = 'fixed';
        switch (FW_position) {
            case 1:
                div.style.top = vertical + 'px';
                div.style.left = horiz + 'px';
                break;
            case 2:
                div.style.top = vertical + 'px';
                div.style.right = horiz + 'px';
                break;
            case 3:
                div.style.bottom = vertical + 'px';
                div.style.right = horiz + 'px';
                break;
            case 4:
                div.style.bottom = vertical + 'px';
                div.style.left = horiz + 'px';
                break;
            default:
                break;
        }
    }

    function sp_transition(start, end) {
        var TweenF = sp_transition.TweenF;
        if (!TweenF) {
            TweenF = Tween[TweenM[prefs.s_method]];
            TweenF = TweenF[TweenEase[prefs.s_ease]] || TweenF;
            sp_transition.TweenF = TweenF;
        }
        var frameSpeed = 1000 / prefs.s_FPS;
        var t = 0; //����,��ʼ
        var b = start; //��ʼ
        var c = end - start; //����
        var d = Math.ceil(prefs.s_duration / frameSpeed); //����,����

        var x = window.scrollX;

        function transition() {
            var y = Math.ceil(TweenF(t, b, c, d));
            //alert(y);
            window.scroll(x, y);
            if (t < d) {
                t++;
                setTimeout(transition, frameSpeed);
            }
        }
        transition();
    }

    function sepHandler(e) {
        e.stopPropagation();
        var div = this;
        //alert(div);
        var target = e.target;
        //alert(target);

        function getRelativeDiv(which) {
            var id = div.id;
            id = id.replace(/(sp-separator-)(.+)/, function(a, b, c) {
                return b + String((Number(c) + (which == 'pre' ? -1 : 1)));
            });
            //alert(id);
            return (id ? document.getElementById(id) : null);
        }

        function scrollIt(a, b) {
            //a=a!==undefined? a : window.scrollY;
            if (prefs.sepT) {
                sp_transition(a, b);
            } else {
                window.scroll(window.scrollX, b);
            }
        }

        var o_scrollY, divS;

        switch (target.className) {
            case 'sp-sp-gotop':
                scrollIt(window.scrollY, 0);
                break;
            case 'sp-sp-gopre':
                var prediv = getRelativeDiv('pre');
                if (!prediv) return;
                o_scrollY = window.scrollY;
                var preDS = prediv.getBoundingClientRect().top;
                if (prefs.sepP) {
                    divS = div.getBoundingClientRect().top;
                    preDS = o_scrollY - (divS - preDS);
                } else {
                    preDS += o_scrollY - 6;
                }
                scrollIt(o_scrollY, preDS);
                break;
            case 'sp-sp-gonext':
                var nextdiv = getRelativeDiv('next');
                if (!nextdiv) return;
                o_scrollY = window.scrollY;
                var nextDS = nextdiv.getBoundingClientRect().top;
                if (prefs.sepP) {
                    divS = div.getBoundingClientRect().top;
                    nextDS = o_scrollY + (-divS + nextDS);
                } else {
                    nextDS += o_scrollY - 6;
                }
                scrollIt(o_scrollY, nextDS);
                break;
            case 'sp-sp-gobottom':
                scrollIt(window.scrollY, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
                break;
            default:
                break;
        }
    }

    //autopager
    var autoPO = {
        startipages: nullFn,
    };
    var hashchangeAdded = false;

    function autopager(SSS, floatWO) {
        //return;
        //��������������ɫ.
        floatWO.updateColor('autopager');

        //��ȡ����λ�ýڵ�.
        var insertPoint;
        var pageElement;
        var insertMode;
        if (SSS.a_HT_insert) {
            insertPoint = getElement(SSS.a_HT_insert[0]);
            insertMode = SSS.a_HT_insert[1];
        } else {
            pageElement = getAllElements(SSS.a_pageElement);
            if (pageElement.length > 0) {
                var pELast = pageElement[pageElement.length - 1];
                insertPoint = pELast.nextSibling ? pELast.nextSibling : pELast.parentNode.appendChild(document.createTextNode(' '));
            }
        }

        if (insertPoint) {
            debug('��֤�Ƿ����ҵ�����λ�ýڵ�:�ɹ�,', insertPoint);
        } else {
            C.error('��֤�Ƿ����ҵ�����λ�ýڵ�:ʧ��', (SSS.a_HT_insert ? SSS.a_HT_insert[0] : ''), 'JSִ����ֹ');
            floatWO.updateColor('Astop');
            return;
        }

        if (pageElement === undefined) {
            pageElement = getAllElements(SSS.a_pageElement);
        }
        if (pageElement.length > 0) {
            debug('��֤�Ƿ����ҵ���ҪԪ��:�ɹ�,', pageElement);
        } else {
            C.error('��֤�Ƿ����ҵ���ҪԪ��:ʧ��,', SSS.a_pageElement, 'JSִ����ֹ');
            floatWO.updateColor('Astop');
            return;
        }

        if (SSS.a_stylish) {  // �����Զ�����ʽ
            GM_addStyle(SSS.a_stylish, 'Super_preloader-style');
        }

        var insertPointP;
        if (insertMode != 2) {
            insertPointP = insertPoint.parentNode;
        }

        var addIntoDoc;
        if (insertMode == 2) {
            addIntoDoc = function(obj) {
                return insertPoint.appendChild(obj);
            };
        } else {
            addIntoDoc = function(obj) {
                return insertPointP.insertBefore(obj, insertPoint);
            };
        }

        var doc, win;

        function XHRLoaded(req) {
            var str = req.responseText;
            doc = win = createDocumentByString(str);

            if (!doc) {
                C.error('�ĵ����󴴽�ʧ��');
                removeL();
                return;
            }
            floatWO.updateColor('autopager');
            floatWO.CmodeIcon('hide');
            floatWO.loadedIcon('show');
            working = false;
            scroll();
        }

        function removeL(isRemoveAddPage) {
            debug('�Ƴ������¼�����');
            floatWO.updateColor('Astop');
            var _remove = remove;
            for (var i = 0, ii = _remove.length; i < ii; i++) {
                _remove[i]();
            }

            if (isRemoveAddPage) {
                var separator = document.querySelector('.sp-separator');
                if (separator) {
                    var insertBefore = insertPoint;
                    if (insertMode == 2) {
                        var l = insertPoint.children.length;
                        if (l > 0) {
                            insertBefore = insertPoint.children[l - 1];
                        }
                    }

                    var range = document.createRange();
                    range.setStartBefore(separator);
                    range.setEndBefore(insertBefore);
                    range.deleteContents();
                    range.detach();

                    if (insertMode == 2) {  // ����Ҫ�����Ƴ���
                        insertPoint.removeChild(insertBefore);
                    }
                }
                var style = document.getElementById("Super_preloader-style");
                if (style)
                    style.parentNode.removeChild(style);
            }
        }
        if (isHashchangeSite && !hashchangeAdded) {
            window.addEventListener("hashchange", onhashChange, false);
            hashchangeAdded = true;
            debug('�ɹ���� hashchange �¼�');
        }

        function onhashChange(event) {
            debug("���� Hashchang �¼�");
            removeL(true);

            setTimeout(function(){
                nextlink = getElement(SSS.nextLink || 'auto;');
                nextlink = getFullHref(nextlink);
                // preLink = getElement(SSS.preLink || 'auto;');
                autopager(SSS, floatWO);
            }, hashchangeTimer);
        }

        var iframe;
        var messageR;

        function iframeLoaded() {
            var iframe = this;
            //alert(this.contentDocument.body)
            var body = iframe.contentDocument.body;
            if (body && body.firstChild) {
                setTimeout(function() {
                    doc = iframe.contentDocument;
                    removeScripts(doc);
                    win = iframe.contentWindow || doc;
                    floatWO.updateColor('autopager');
                    floatWO.CmodeIcon('hide');
                    floatWO.loadedIcon('show');
                    working = false;

                    scroll();
                }, SSS.a_itimeout);
            }
        }

        function iframeRquest(link) {
            messageR = false;
            if (SSS.a_newIframe || !iframe) {
                var i = document.createElement('iframe');
                iframe = i;
                i.name = 'superpreloader-iframe';
                i.width = '100%';
                i.height = '0';
                i.frameBorder = "0";
                i.style.cssText = '\
                    margin:0!important;\
                    padding:0!important;\
                    visibility:hidden!important;\
                ';
                i.src = link;
                if (SSS.a_iloaded) {
                    i.addEventListener('load', iframeLoaded, false);
                    remove.push(function() {
                        i.removeEventListener('load', iframeLoaded, false);
                    });
                } else {
                    var messagehandler = function (e) {
                        if (!messageR && e.data == 'superpreloader-iframe:DOMLoaded') {
                            messageR = true;
                            iframeLoaded.call(i);
                            if (SSS.a_newIframe) {
                                window.removeEventListener('message', messagehandler, false);
                            }
                        }
                    };
                    window.addEventListener('message', messagehandler, false);
                    remove.push(function() {
                        window.removeEventListener('message', messagehandler, false);
                    });
                }
                document.body.appendChild(i);
            } else {
                iframe.src = link;
                iframe.contentDocument.location.replace(link);
            }
        }

        var working;

        function doRequest() {
            working = true;
            floatWO.updateColor('loading');
            floatWO.CmodeIcon('show');

            debug('��ȡ��һҳ' + (SSS.a_useiframe ? '(iframe��ʽ)': ''), nextlink);
            if (SSS.a_useiframe) {
                iframeRquest(nextlink);
            } else {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: nextlink,
                    overrideMimeType: 'text/html; charset=' + document.characterSet,
                    onload: XHRLoaded
                });
            }
        }

        var ipagesmode = SSS.a_ipages[0];
        var ipagesnumber = SSS.a_ipages[1];
        var scrollDo = nullFn;
        var afterInsertDo = nullFn;
        if (prefs.Aplus) {
            afterInsertDo = doRequest;
            doRequest();
        } else {
            scrollDo = doRequest;
            if (ipagesmode) doRequest();
        }

        var manualDiv;

        function manualAdiv() {
            if (!manualDiv) {
                GM_addStyle('\
                    #sp-sp-manualdiv{\
                        line-height:1.6!important;\
                        opacity:1!important;\
                        position:relative!important;\
                        float:none!important;\
                        top:0!important;\
                        left:0!important;\
                        z-index: 1000!important;\
                        min-width:366px!important;\
                        width:auto!important;\
                        text-align:center!important;\
                        font-size:14px!important;\
                        padding:3px 0!important;\
                        margin:5px 10px 8px;\
                        clear:both!important;\
                        border-top:1px solid #ccc!important;\
                        border-bottom:1px solid #ccc!important;\
                        -moz-border-radius:30px!important;\
                        border-radius:30px!important;\
                        background-color:#F5F5F5!important;\
                        -moz-box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
                        -webkit-box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
                        box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
                    }\
                    .sp-sp-md-span{\
                        font-weight:bold!important;\
                        margin:0 5px!important;\
                    }\
                    #sp-sp-md-number{\
                        width:50px!important;\
                        vertical-align:middle!important;\
                        display:inline-block!important;\
                        text-align:left!important;\
                    }\
                    #sp-sp-md-imgnext{\
                        padding:0!important;\
                        margin:0 0 0 5px!important;\
                        vertical-align:middle!important;\
                        display:inline-block!important;\
                    }\
                    #sp-sp-manualdiv:hover{\
                        cursor:pointer;\
                    }\
                    #sp-sp-md-someinfo{\
                        position:absolute!important;\
                        right:16px!important;\
                        bottom:1px!important;\
                        font-size:10px!important;\
                        text-shadow:white 0 1px 0!important;\
                        color:#5A5A5A!important;\
                        font-style:italic!important;\
                        z-index:-1!important;\
                        background:none!important;\
                    }\
                ');

                var div = $C('div', { id: 'sp-sp-manualdiv' });
                manualDiv = div;
                var span = $C('span', { class: 'sp-sp-md-span' }, '��');
                div.appendChild(span);

                var input = $C('input', {
                    type: 'number',
                    value: 1,
                    min: 1,
                    title: '��������Ҫƴ�ӵ�ҳ��(����>=1),Ȼ�󰴻س�.',
                    id: 'sp-sp-md-number'
                });

                var getInputValue = function () {
                    var value = Number(input.value);
                    if (isNaN(value) || value < 1) {
                        value = 1;
                        input.value = 1;
                    }
                    return value;
                };

                var spage = function () {
                    if (doc) {
                        var value = getInputValue();
                        //alert(value);
                        ipagesmode = true;
                        ipagesnumber = value + paged;
                        insertedIntoDoc();
                    }
                };
                input.addEventListener('keyup', function(e) {
                    //alert(e.keyCode);
                    if (e.keyCode == 13) { //�س�
                        spage();
                    }
                }, false);
                div.appendChild(input);
                div.appendChild($C('span', { className: 'sp-sp-md-span' }, 'ҳ'));
                div.appendChild($C('img', {id: 'sp-sp-md-imgnext', src: _sep_icons.next}));
                div.appendChild($C('span', { id: 'sp-sp-md-someinfo' }, prefs.someValue));
                document.body.appendChild(div);
                div.addEventListener('click', function(e) {
                    if (e.target.id == 'sp-sp-md-number') return;
                    spage();
                }, false);
            }
            addIntoDoc(manualDiv);
            manualDiv.style.display = 'block';
        }

        function beforeInsertIntoDoc() {
            working = true;
            if (SSS.a_manualA && !ipagesmode) { //��ʾ�ֶ���ҳ������.
                manualAdiv();
            } else { //ֱ��ƴ��.
                insertedIntoDoc();
            }
        }


        var sepStyle;
        var goNextImg = [false];
        var sNumber = prefs.sepStartN;
        var _sep_icons = sep_icons;
        var curNumber = sNumber;

        function createSep(lastUrl, currentUrl, nextUrl) {
            var div = document.createElement('div');
            if (SSS.a_separator) {
                if (!sepStyle) {
                    sepStyle = GM_addStyle('\
                        div.sp-separator{\
                            line-height:1.6!important;\
                            opacity:1!important;\
                            position:relative!important;\
                            float:none!important;\
                            top:0!important;\
                            left:0!important;\
                            min-width:366px;\
                            width:auto;\
                            text-align:center!important;\
                            font-size:14px!important;\
                            display:block!important;\
                            padding:3px 0!important;\
                            margin:5px 10px 8px;\
                            clear:both!important;\
                            border-top:1px solid #ccc!important;\
                            border-bottom:1px solid #ccc!important;\
                            -moz-border-radius:30px!important;\
                            border-radius:30px!important;\
                            background-color:#F5F5F5!important;\
                            -moz-box-shadow:inset 0 16px 20px #fff,0 2px 3px rgba(0,0,0,0.1);\
                            -webkit-box-shadow:inset 0 16px 20px #fff,0 2px 3px rgba(0,0,0,0.1);\
                            box-shadow:inset 0 16px 20px #fff,0 2px 3px rgba(0,0,0,0.1);\
                        }\
                        div.sp-separator img{\
                            vertical-align:middle!important;\
                            cursor:pointer!important;\
                            padding:0!important;\
                            margin:0 5px!important;\
                            border:none!important;\
                            display:inline-block!important;\
                            float:none!important;\
                            width: auto;\
                            height: auto;\
                        }\
                        div.sp-separator a.sp-sp-nextlink{\
                            margin:0 20px 0 -6px!important;\
                            display:inline!important;\
                            text-shadow:#fff 0 1px 0!important;\
                            background:none!important;\
                        }\
                        div.sp-separator span.sp-span-someinfo{\
                            position:absolute!important;\
                            right:16px!important;\
                            bottom:1px!important;\
                            font-size:10px!important;\
                            text-shadow:white 0 1px 0!important;\
                            color:#5A5A5A!important;\
                            font-style:italic!important;\
                            z-index:-1!important;\
                            background:none!important;\
                        }\
                    ');
                }

                div.className = 'sp-separator';
                div.id = 'sp-separator-' + curNumber;
                div.addEventListener('click', sepHandler, false);

                var pageStr = '�� <span style="color:red!important;">' + curNumber + '</span> ҳ' +
                        ( SSS.a_separatorReal ? getRalativePageStr(lastUrl, currentUrl, nextUrl) : '');
                div.appendChild($C('a', {
                    class: 'sp-sp-nextlink',
                    href: currentUrl,
                    title: currentUrl
                }, pageStr));

                div.appendChild($C('img', {
                    src: _sep_icons.top,
                    class: 'sp-sp-gotop',
                    alt: 'ȥ������',
                    title: 'ȥ������'
                }));

                div.appendChild($C('img', {
                    src: curNumber == sNumber ? _sep_icons.pre_gray : _sep_icons.pre,
                    class: 'sp-sp-gopre',
                    title: '�Ϲ�һҳ'
                }));

                var i_next = $C('img', {
                    src: _sep_icons.next_gray,
                    class: 'sp-sp-gonext',
                    title: '�¹�һҳ'
                });

                if (goNextImg.length == 2) {
                    goNextImg.shift();
                }
                goNextImg.push(i_next);
                div.appendChild(i_next);

                div.appendChild($C('img', {
                    src: _sep_icons.bottom,
                    class: 'sp-sp-gobottom',
                    alt: 'ȥ���ײ�',
                    title: 'ȥ���ײ�'
                }));

                div.appendChild($C('span', { class: 'sp-span-someinfo' }, prefs.someValue));
                curNumber += 1;
            } else {
                div.style.cssText = '\
                    height:0!important;\
                    width:0!important;\
                    margin:0!important;\
                    padding:0!important;\
                    border:none!important;\
                    clear:both!important;\
                    display:block!important;\
                    visibility:hidden!important;\
                ';
            }
            return div;
        }

        var paged = 0;

        function insertedIntoDoc() {
            if (!doc) return;

            if(SSS.a_documentFilter){
                try{
                    SSS.a_documentFilter(doc, nextlink);
                }catch(e){
                    C.error("ִ�� documentFilter ����", e, SSS.a_documentFilter.toString());
                }
            }

            var docTitle = getElementByCSS("title", doc).textContent;

            removeScripts(doc);

            var fragment = document.createDocumentFragment();
            var pageElements = getAllElements(SSS.a_pageElement, false, doc, win);
            var ii = pageElements.length;
            if (ii <= 0) {
                debug('��ȡ��һҳ����Ҫ����ʧ��', SSS.a_pageElement);
                removeL();
                return;
            }

            // ��ǰ������һҳ���ӣ������ٸ�ֵ
            var lastUrl = cplink;
            cplink = nextlink;
            var nl = getElement(SSS.nextLink, false, doc, win);
            if (nl) {
                nl = getFullHref(nl);
                if (nl == nextlink) {
                    nextlink = null;
                } else {
                    nextlink = nl;
                }
            } else {
                nextlink = null;
            }

            var i, pe_x, pe_x_nn;
            for (i = 0; i < ii; i++) {
                pe_x = pageElements[i];
                pe_x_nn = pe_x.nodeName;
                if (pe_x_nn == 'BODY' || pe_x_nn == 'HTML' || pe_x_nn == 'SCRIPT') continue;
                fragment.appendChild(pe_x);
            }

            if (SSS.filter && typeof(SSS.filter) == 'string') { //����δ����.
                //alert(SSS.filter);
                var nodes = [];
                try {
                    nodes = getAllElements(SSS.filter, fragment);
                } catch (e) {}
                var nodes_x;
                for (i = nodes.length - 1; i >= 0; i--) {
                    nodes_x = nodes[i];
                    nodes_x.parentNode.removeChild(nodes_x);
                }
            }

            // lazyImgSrc
            if (SSS.lazyImgSrc) {
                handleLazyImgSrc(SSS.lazyImgSrc, fragment);
            }

            var imgs;
            if (!window.opera && SSS.a_useiframe && !SSS.a_iloaded) {
                imgs = getAllElements('css;img[src]', fragment); //�ռ�����ͼƬ
            }

            // ������һҳ���ݲ��������Ƿ��±�ǩҳ��
            if (prefs.forceTargetWindow) {
                var arr = Array.prototype.slice.call(fragment.querySelectorAll('a[href]:not([href^="mailto:"]):not([href^="javascript:"]):not([href^="#"])'));
                arr.forEach(function (elem){
                    elem.setAttribute('target', '_blank');
                    if (elem.getAttribute('onclick') == 'atarget(this)') {  // ������̳�Ŀ����Ƿ����±�ǩҳ��
                        elem.removeAttribute('onclick');
                    }
                });
            }

            var sepdiv = createSep(lastUrl, cplink, nextlink);
            if (pageElements[0] && pageElements[0].tagName == 'TR') {
                var insertParent = insertPoint.parentNode;
                var colNodes = getAllElements('child::tr[1]/child::*[self::td or self::th]', insertParent);
                var colums = 0;
                for (var x = 0, l = colNodes.length; x < l; x++) {
                    var col = colNodes[x].getAttribute('colspan');
                    colums += parseInt(col, 10) || 1;
                }
                var td = doc.createElement('td');
                td.appendChild(sepdiv);
                var tr = doc.createElement('tr');
                td.setAttribute('colspan', colums);
                tr.appendChild(td);
                fragment.insertBefore(tr, fragment.firstChild);
            } else {
                fragment.insertBefore(sepdiv, fragment.firstChild);
            }

            addIntoDoc(fragment);

            // filter
            if (SSS.filter && typeof(SSS.filter) == 'function') {
                try{
                    SSS.filter(pageElements);
                    debug("ִ�� filter(pages) �ɹ�");
                }catch(e){
                    C.error("ִ�� filter(pages) ����", e, SSS.filter.toString());
                }
            }

            if (imgs) { //��opera,��iframeDOMȡ������ʱ��Ҫ����ͼƬ.
                setTimeout(function() {
                    var _imgs = imgs;
                    var i, ii, img;
                    for (i = 0, ii = _imgs.length; i < ii; i++) {
                        img = _imgs[i];
                        var src = img.src;
                        img.src = src;
                    }
                }, 99);
            }

            if (SSS.a_replaceE) {
                var oldE = getAllElements(SSS.a_replaceE);
                var oldE_lt = oldE.length;
                //alert(oldE_lt);
                if (oldE_lt > 0) {
                    var newE = getAllElements(SSS.a_replaceE, false, doc, win);
                    var newE_lt = newE.length;
                    //alert(newE_lt);
                    if (newE_lt == oldE_lt) {  // �滻
                        var oldE_x, newE_x;
                        for (i = 0; i < newE_lt; i++) {
                            oldE_x = oldE[i];
                            newE_x = newE[i];
                            newE_x = doc.importNode(newE_x, true);
                            oldE_x.parentNode.replaceChild(newE_x, oldE_x);
                        }
                    }
                }
            }

            paged += 1;
            if (ipagesmode && paged >= ipagesnumber) {
                ipagesmode = false;
            }
            floatWO.loadedIcon('hide');
            if (manualDiv) {
                manualDiv.style.display = 'none';
            }
            if (goNextImg[0]) goNextImg[0].src = _sep_icons.next;


            var ev = document.createEvent('Event');
            ev.initEvent('Super_preloaderPageLoaded', true, false);
            document.dispatchEvent(ev);

            if(prefs.enableHistory){
                try {
                    window.history.pushState(null, docTitle, cplink);
                } catch(e) {}
            }

            if (paged >= SSS.a_maxpage) {
                debug('�������趨�����ҳ��', SSS.a_maxpage);
                notice('<b>״̬</b>:' + '�������趨�����ҳ��:<b style="color:red">' + SSS.a_maxpage + '</b>');
                removeL();
                return;
            }
            var delayiframe = function(fn) {
                setTimeout(fn, 199);
            };
            if (nextlink) {
                // debug('�ҵ���һҳ����:', nextlink);
                doc = win = null;
                if (ipagesmode) {
                    if (SSS.a_useiframe) { //��ʱ��,firefox,̫���Ῠ-_-!
                        delayiframe(doRequest);
                    } else {
                        doRequest();
                    }
                } else {
                    working = false;
                    if (SSS.a_useiframe) {
                        delayiframe(afterInsertDo);
                    } else {
                        afterInsertDo();
                    }
                }
            } else {
                debug('û���ҵ���һҳ����', SSS.nextLink);
                removeL();
                return;
            }
        }

        //����,ʣ��߶����ܸ߶ȵı�ֵ.
        var relatedObj_0, relatedObj_1;
        if (SSS.a_relatedObj) {
            if (_.isArray(SSS.a_relatedObj)) {
                relatedObj_0 = SSS.a_relatedObj[0];
                relatedObj_1 = SSS.a_relatedObj[1];
            } else {
                relatedObj_0 = SSS.a_pageElement;
                relatedObj_1 = 'bottom';
            }
        }

        function getRemain() {
            var scrolly = window.scrollY;
            var WI = window.innerHeight;
            var obj = getLastElement(relatedObj_0);
            var scrollH = (obj && obj.nodeType == 1) ? (obj.getBoundingClientRect()[relatedObj_1] + scrolly) : Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            return (scrollH - scrolly - WI) / WI; //ʣ��߶���ҳ���ܸ߶ȵı���.
        }

        var pause = false;
        if (prefs.pauseA) {
            var Sbutton = ['target', 'shiftKey', 'ctrlKey', 'altKey'];
            var ltype = prefs.mouseA ? 'mousedown' : 'dblclick';
            var button_1 = Sbutton[prefs.Pbutton[0]];
            var button_2 = Sbutton[prefs.Pbutton[1]];
            var button_3 = Sbutton[prefs.Pbutton[2]];

            var pauseIt = function () {
                pause = !pause;
                if (prefs.stop_ipage) ipagesmode = false;
                if (pause) {
                    floatWO.updateColor('Apause');
                    notice('<b>״̬</b>:' + '�Զ���ҳ<span style="color:red!important;"><b>��ͣ</b></span>.');
                } else {
                    floatWO.updateColor('autopager');
                    floatWO.CmodeIcon('hide');
                    notice('<b>״̬</b>:' + '�Զ���ҳ<span style="color:red!important;"><b>����</b></span>.');
                }
                scroll();
            };
            var Sctimeout;

            var clearPause = function () {
                clearTimeout(Sctimeout);
                document.removeEventListener('mouseup', arguments.callee, false);
            };

            var pausehandler = function (e) {
                if (!SSS.a_manualA || ipagesmode || pause) {
                    if (e[button_1] && e[button_2] && e[button_3]) {
                        if (e.type == 'mousedown') {
                            document.addEventListener('mouseup', clearPause, false);
                            Sctimeout = setTimeout(pauseIt, prefs.Atimeout);
                        } else {
                            pauseIt();
                        }
                    }
                }
            };
            document.addEventListener(ltype, pausehandler, false);
            remove.push(function() {
                document.removeEventListener(ltype, pausehandler, false);
            });
        }

        function scroll() {
            if (!pause && !working && (getRemain() <= SSS.a_remain || ipagesmode)) {
                if (doc) { //�еĻ�,�Ͳ��뵽�ĵ�.
                    beforeInsertIntoDoc();
                } else { //����������ĵ�.
                    scrollDo();
                }
            }
        }

        var timeout;
        function timeoutfn(){
            clearTimeout(timeout);
            timeout = setTimeout(scroll, 100);
        }
        window.addEventListener('scroll', timeoutfn, false);
        remove.push(function() {
            window.removeEventListener('scroll', timeoutfn, false);
        });

        autoPO = {
            startipages: function(value) {
                if (value > 0) {
                    ipagesmode = true;
                    ipagesnumber = value + paged;
                    notice('<b>״̬</b>:' + '��ǰ�ѷ�ҳ����:<b>' + paged + '</b>,' + '������ҳ����<b style="color:red!important;">' + ipagesnumber + '</b>ҳ.');
                    if (SSS.a_manualA) insertedIntoDoc();
                    scroll();
                }
            },
        };
    }

    //prefetcher
    function prefetcher(SSS, floatWO) {
        function cContainer() {
            var div = document.createElement('div');
            var div2 = div.cloneNode(false);
            var hr = document.createElement('hr');
            div.style.cssText = '\
                margin:3px!important;\
                padding:5px!important;\
                border-radius:8px!important;\
                -moz-border-radius:8px!important;\
                border-bottom:1px solid #E30005!important;\
                border-top:1px solid #E30005!important;\
                background-color:#F5F5F5!important;\
                float:none!important;\
            ';
            div.title = 'Ԥ��������';
            div2.style.cssText = '\
                text-align:left!important;\
                color:red!important;\
                font-size:13px!important;\
                display:block!important;\
                float:none!important;\
                position:static!important;\
            ';
            hr.style.cssText = '\
                display:block!important;\
                border:1px inset #000!important;\
            ';
            div.appendChild(div2);
            div.appendChild(hr);
            document.body.appendChild(div);
            return {
                div: div,
                div2: div2
            };
        }

        floatWO.updateColor('prefetcher');

        floatWO.updateColor('loading');
        floatWO.CmodeIcon('show');

        if (SSS.useiframe) {
            var iframe = document.createElement('iframe');
            iframe.name = 'superpreloader-iframe';
            iframe.src = nextlink;
            iframe.width = '100%';
            iframe.height = '0';
            iframe.frameBorder = "0";
            iframe.style.cssText = '\
                margin:0!important;\
                padding:0!important;\
            ';
            iframe.addEventListener('load', function() {
                var body = this.contentDocument.body;
                if (body && body.firstChild) {
                    floatWO.updateColor('prefetcher');
                    floatWO.CmodeIcon('hide');
                    floatWO.loadedIcon('show');
                    this.removeEventListener('load', arguments.callee, false);

                    if (SSS.lazyImgSrc) {
                        handleLazyImgSrc(SSS.lazyImgSrc, body);
                    }
                }
            }, false);
            if (SSS.viewcontent) {
                var container = cContainer();
                container.div2.innerHTML = 'iframeȫԤ��: ' + '<br />' + 'Ԥ����ַ: ' + '<b>' + nextlink + '</b>';
                iframe.height = '300px';
                container.div.appendChild(iframe);
            } else {
                document.body.appendChild(iframe);
            }
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: nextlink,
                overrideMimeType: 'text/html; charset=' + document.characterSet,
                onload: function(req) {
                    var str = req.responseText;
                    var doc = createDocumentByString(str);
                    if (!doc) {
                        C.error('�ĵ����󴴽�ʧ��!');
                        return;
                    }

                    if (SSS.lazyImgSrc) {
                        handleLazyImgSrc(SSS.lazyImgSrc, doc);
                    }

                    var images = doc.images;
                    var isl = images.length;
                    var img;
                    var iarray = [];
                    var i;
                    var existSRC = {};
                    var isrc;
                    for (i = isl - 1; i >= 0; i--) {
                        isrc = images[i].getAttribute('src');
                        if (!isrc || existSRC[isrc]) {
                            continue;
                        } else {
                            existSRC[isrc] = true;
                        }
                        img = document.createElement('img');
                        img.src = isrc;
                        iarray.push(img);
                    }
                    if (SSS.viewcontent) {
                        var containter = cContainer();
                        var div = containter.div;
                        i = iarray.length;
                        containter.div2.innerHTML = 'Ԥ��ȡͼƬ����: ' + '<b>' + i + '</b>' + '<br />' + 'Ԥ����ַ: ' + '<b>' + nextlink + '</b>';
                        for (i -= 1; i >= 0; i--) {
                            div.appendChild(iarray[i]);
                        }
                    }
                    floatWO.updateColor('prefetcher');
                    floatWO.loadedIcon('show');
                    floatWO.CmodeIcon('hide');
                }
            });
        }
    }


    //ִ�п�ʼ..///////////////////

    // ����������
    var blackList_re = new RegExp(blackList.map(wildcardToRegExpStr).join("|"));
    if(blackList_re.test(url)){
        debug('ƥ���������jsִ����ֹ');
        return;
    }

    //�Ƿ���frame�ϼ���..
    if (prefs.DisableI && window.self != window.parent) {
        var isReturn = !_.find(DIExclude, function(x){ return x[1] && x[2].test(url); });
        if (isReturn) {
            debug('urlΪ:', url, '��ҳ��Ϊ�Ƕ��㴰��,JSִ����ֹ.');
            return;
        }
    }
    debug('urlΪ:', url, 'JS���سɹ�');

    //��һ�׶�..�����߼�ģʽ..
    SITEINFO = SITEINFO.concat(SITEINFO_TP, SITEINFO_comp);

    //��Ҫ�ı�����ö.
    var nextlink;
    var prelink;
    //===============

    var SSS = {};

    var findCurSiteInfo = function() {
        var SII;
        var SIIA;
        var SIIAD = SITEINFO_D.autopager;
        var Rurl;
        var ii = SITEINFO.length;

        debug('�߼���������:', ii);

        for (var i = 0; i < ii; i++) {
            SII = SITEINFO[i];
            Rurl = toRE(SII.url);
            if (Rurl.test(url)) {
                debug('�ҵ�ƥ�䵱ǰվ��Ĺ���:', SII, '�ǵ�', i + 1, '����');

                // ���й���� startFilter
                if (SII.autopager && SII.autopager.startFilter) {
                    SII.autopager.startFilter(window, document);
                    debug('�ɹ����� startFilter');
                }

                nextlink = getElement(SII.nextLink || 'auto;');
                if (!nextlink) {
                    debug('�޷��ҵ���һҳ����,��������:', SII, '����������������');
                    continue;
                }

                if (SII.preLink && SII.preLink != 'auto;') { //����趨�˾����preLink
                    prelink = getElement(SII.preLink);
                } else {
                    if(prefs.autoGetPreLink){
                        getElement('auto;');
                    }
                }

                // alert(prelink);
                SSS.hasRule = true;
                SSS.Rurl = String(Rurl);
                // alert(SSS.Rurl);
                SSS.nextLink = SII.nextLink || 'auto;';
                SSS.viewcontent = SII.viewcontent;
                SSS.enable = (SII.enable === undefined) ? SITEINFO_D.enable : SII.enable;
                SSS.useiframe = (SII.useiframe === undefined) ? SITEINFO_D.useiframe : SII.useiframe;
                if (SII.pageElement) { //�����Oautopager�Ĺ���..
                    if (!(SII.autopager instanceof Object)) SII.autopager = {};
                    SII.autopager.pageElement = SII.pageElement;
                    if (SII.insertBefore) SII.autopager.HT_insert = [SII.insertBefore, 1];
                }

                //�Զ���ҳ����.
                SIIA = SII.autopager;
                if (SIIA) {
                    SSS.a_pageElement = SIIA.pageElement;
                    if (!SSS.a_pageElement) break;
                    SSS.a_manualA = (SIIA.manualA === undefined) ? SIIAD.manualA : SIIA.manualA;
                    SSS.a_enable = (SIIA.enable === undefined) ? SIIAD.enable : SIIA.enable;
                    SSS.a_useiframe = (SIIA.useiframe === undefined) ? SIIAD.useiframe : SIIA.useiframe;
                    SSS.a_newIframe = (SIIA.newIframe === undefined) ? SIIAD.newIframe : SIIA.newIframe;
                    SSS.a_iloaded = (SIIA.iloaded === undefined) ? SIIAD.iloaded : SIIA.iloaded;
                    SSS.a_itimeout = (SIIA.itimeout === undefined) ? SIIAD.itimeout : SIIA.itimeout;
                    //alert(SSS.a_itimeout);
                    SSS.a_remain = (SIIA.remain === undefined) ? SIIAD.remain : SIIA.remain;
                    SSS.a_maxpage = (SIIA.maxpage === undefined) ? SIIAD.maxpage : SIIA.maxpage;
                    SSS.a_separator = (SIIA.separator === undefined) ? SIIAD.separator : SIIA.separator;
                    SSS.a_separatorReal = (SIIA.separatorReal === undefined) ? SIIAD.separatorReal : SIIA.separatorReal;
                    SSS.a_replaceE = SIIA.replaceE;
                    SSS.a_HT_insert = SIIA.HT_insert;
                    SSS.a_relatedObj = SIIA.relatedObj;
                    SSS.a_ipages = (SIIA.ipages === undefined) ? SIIAD.ipages : SIIA.ipages;

                    // new
                    SSS.filter = SII.filter || SIIA.filter;  // �����˺�������ʽ��ԭ���Ĺ������Ƴ� pageElement
                    SSS.a_documentFilter = SII.documentFilter || SIIA.documentFilter;
                    SSS.a_stylish = SII.stylish || SIIA.stylish;
                    SSS.lazyImgSrc = SIIA.lazyImgSrc;
                }

                // �����Ƿ��������
                var pageElement = getElement(SSS.a_pageElement);
                if (!pageElement) {
                    debug('�޷��ҵ�����,��������:', SII, '����������������');
                    continue;
                }

                break;
            }
        }

        if (!SSS.hasRule) {
            debug('δ�ҵ����ʵĸ߼�����,��ʼ�Զ�ƥ��.');
            //�Զ�����.
            if (!autoMatch.keyMatch) {
                debug('�Զ�ƥ�书�ܱ�������.');
            } else {
                nextlink = autoGetLink();
                //alert(nextlink);
                if (nextlink) { //ǿ��ģʽ.
                    var FA = autoMatch.FA;
                    SSS.Rurl = window.localStorage ? ('am:' + (url.match(/^https?:\/\/[^:]*\//i) || [])[0]) : 'am:automatch';
                    //alert(SSS.Rurl);
                    SSS.enable = true;
                    SSS.nextLink = 'auto;';
                    SSS.viewcontent = autoMatch.viewcontent;
                    SSS.useiframe = autoMatch.useiframe;
                    SSS.a_force = true;
                    SSS.a_manualA = FA.manualA;
                    // SSS.a_enable = FA.enable || false; //����ʹa_enable��ֵ==undefined...
                    SSS.a_enable = FA.enable || SITEINFO_D.autopager.force_enable; //����ʹa_enable��ֵ==undefined...
                    SSS.a_useiframe = FA.useiframe;
                    SSS.a_iloaded = FA.iloaded;
                    SSS.a_itimeout = FA.itimeout;
                    SSS.a_remain = FA.remain;
                    SSS.a_maxpage = FA.maxpage;
                    SSS.a_separator = FA.separator;
                    SSS.a_ipages = FA.ipages;
                }
            }
        }

        // �������û lazyImgSrc������Ĭ��ֵ
        if (!SSS.lazyImgSrc) {
            SSS.lazyImgSrc = prefs.lazyImgSrc;
        }

        debug('�����߼�������Զ�ƥ������ܺ�ʱ:', new Date() - startTime, '����');
    };

    findCurSiteInfo();

    //����ҳ��û���ҵ���
    if (!nextlink && !prelink) {
        debug('δ�ҵ��������, JSִ��ֹͣ. ����ʱ' + (new Date() - startTime) + '����');
        return;
    } else {
        debug('��һҳ����:', prelink);
        debug('��һҳ����:', nextlink);
        nextlink = nextlink ? (nextlink.href || nextlink) : undefined;
        prelink = prelink ? (prelink.href || prelink) : undefined;
    }

    var superPreloader = {
        go: function() {
            if (nextlink) window.location.href = nextlink;
        },
        back: function() {
            if(!prelink) getElement('auto;');
            if (prelink) window.location.href = prelink;
        },
    };

    if (prefs.arrowKeyPage) {
        debug('��Ӽ������ҷ������ҳ����.');
        document.addEventListener('keyup', function(e) {
            var tarNN = e.target.nodeName;
            if (tarNN != 'BODY' && tarNN != 'HTML') return;
            switch (e.keyCode) {
                case 37:
                    superPreloader.back();
                    break;
                case 39:
                    superPreloader.go();
                    break;
                default:
                    break;
            }
        }, false);
    }

    // ������һҳ�¼�.
    debug('���������Ʒ�ҳ����.');
    document.addEventListener('superPreloader.go', function() {
        superPreloader.go();
    }, false);

    // ������һҳ�¼�.
    document.addEventListener('superPreloader.back', function() {
        superPreloader.back();
    }, false);

    // û�ҵ���һҳ������
    if (!nextlink) {
        debug('��һҳ���Ӳ�����,JS�޷�����.');
        debug('ȫ�����̺�ʱ:', new Date() - startTime, '����');
        return;
    }

    // ��������..
    var loadLocalSetting = function() {
        debug('��������');
        var savedValue = getValue('spfwset');
        if (savedValue) {
            try {
                savedValue = eval(savedValue);
            } catch (e) {
                saveValue('spfwset', ''); //�����������,���ֶ��޸Ĺ�?,�����,��Ȼ�´λ���Ҫ����.
            }
        }
        if (savedValue) {
            SSS.savedValue = savedValue;
            for (i = 0, ii = savedValue.length; i < ii; i++) {
                savedValue_x = savedValue[i];
                if (savedValue_x.Rurl == SSS.Rurl) {
                    for (var ix in savedValue_x) {
                        if (savedValue_x.hasOwnProperty(ix)) {
                            SSS[ix] = savedValue_x[ix]; //���ؼ�ֵ.
                        }
                    }
                    break;
                }
            }
            //alert(i);
            SSS.sedValueIndex = i;
        } else {
            SSS.savedValue = [];
            SSS.sedValueIndex = 0;
        }
    };

    loadLocalSetting();

    if (!SSS.hasRule) {
        SSS.a_force = true;
    }

    if (SSS.a_force) {
        SSS.a_pageElement = '//body/*';
        SSS.a_HT_insert = undefined;
        SSS.a_relatedObj = undefined;
    }

    if (prefs.floatWindow) {
        debug('����������');
        floatWindow(SSS);
    }

    if (!SSS.enable) {
        debug('�����򱻹ر�,�ű�ִ��ֹͣ');
        debug('ȫ�����̺�ʱ:', new Date() - startTime, '����');
        return;
    }
    debug('ȫ�����̺�ʱ:', new Date() - startTime, '����');

    // Ԥ�����߷�ҳ.
    if (SSS.a_enable) {
        debug('��ʼ��,��ҳģʽ.');
        autopager(SSS, floatWO);
    } else {
        debug('��ʼ��,Ԥ��ģʽ.');
        prefetcher(SSS, floatWO);
    }

    var docChecked;
    function autoGetLink(doc, win) {
        if (!autoMatch.keyMatch) return;
        if (!parseKWRE.done) {
            parseKWRE();
            parseKWRE.done = true;
        }

        var startTime = new Date();
        doc = doc || document;
        win = win || window;

        if (doc == document) { //��ǰ�ĵ�,ֻ���һ��.
            //alert(nextlink);
            if (docChecked) return nextlink;
            docChecked = true;
        }

        var _prePageKey = prePageKey;
        var _nextPageKey = nextPageKey;
        var _nPKL = nextPageKey.length;
        var _pPKL = prePageKey.length;
        var _getFullHref = getFullHref;
        var _getAllElementsByXpath = getAllElementsByXpath;
        var _Number = Number;
        var _domain_port = domain_port;
        var alllinks = doc.links;
        var alllinksl = alllinks.length;

        var curLHref = cplink;
        var _nextlink;
        var _prelink;
        if (!autoGetLink.checked) { //��һ�μ��
            _nextlink = nextlink;
            _prelink = prelink;
        } else {
            _prelink = true;
        }

        var DCEnable = autoMatch.digitalCheck;
        var DCRE = /^\s*\D{0,1}(\d+)\D{0,1}\s*$/;

        var i, a, ahref, atext, numtext;
        var aP, initSD, searchD = 1,
            preS1, preS2, searchedD, pSNText, preSS, nodeType;
        var nextS1, nextS2, nSNText, nextSS;
        var aimgs, j, jj, aimg_x, xbreak, k, keytext;

        function finalCheck(a, type) {
            var ahref = a.getAttribute('href'); //��chrome�ϵ��Ƿǵ�ǰҳ���ĵ������ʱ��ֱ����a.href����,������href
            if (ahref == '#') {
                return null;
            }
            ahref = _getFullHref(ahref); //�����·����ȡ��ȫ��href;

            //3������:httpЭ������,��������ǰҳ�������,�ǿ���
            if (/^https?:/i.test(ahref) && ahref.replace(/#.*$/, '') != curLHref && ahref.match(/https?:\/\/([^\/]+)/)[1] == _domain_port) {
                if (xbug) {
                    debug((type == 'pre' ? '��һҳ' : '��һҳ') + 'ƥ�䵽�Ĺؼ���Ϊ:', atext);
                }
                return a; //���ض���A
                //return ahref;
            }
        }

        if (xbug) {
            debug('ȫ�ĵ���������:', alllinksl);
        }

        for (i = 0; i < alllinksl; i++) {
            if (_nextlink && _prelink) break;
            a = alllinks[i];
            if (!a) continue; //undefined����
            //links���Ϸ��صı������ǰ���href��aԪ��..���Բ��ü��
            //if(!a.hasAttribute("href"))continue;
            atext = a.textContent;
            if (atext) {
                if (DCEnable) {
                    numtext = atext.match(DCRE);
                    if (numtext) { //�ǲ��Ǵ�����
                        //debug(numtext);
                        numtext = numtext[1];
                        //alert(numtext);
                        aP = a;
                        initSD = 0;

                        if (!_nextlink) {
                            preS1 = a.previousSibling;
                            preS2 = a.previousElementSibling;


                            while (!(preS1 || preS2) && initSD < searchD) {
                                aP = aP.parentNode;
                                if (aP) {
                                    preS1 = aP.previousSibling;
                                    preS2 = aP.previousElementSibling;
                                }
                                initSD++;
                                //alert('initSD: '+initSD);
                            }
                            searchedD = initSD > 0 ? true : false;

                            if (preS1 || preS2) {
                                pSNText = preS1 ? preS1.textContent.match(DCRE) : '';
                                if (pSNText) {
                                    preSS = preS1;
                                } else {
                                    pSNText = preS2 ? preS2.textContent.match(DCRE) : '';
                                    preSS = preS2;
                                }
                                //alert(previousS);
                                if (pSNText) {
                                    pSNText = pSNText[1];
                                    //debug(pSNText)
                                    //alert(pSNText)
                                    if (_Number(pSNText) == _Number(numtext) - 1) {
                                        //alert(searchedD);
                                        nodeType = preSS.nodeType;
                                        //alert(nodeType);
                                        if (nodeType == 3 || (nodeType == 1 && (searchedD ? _getAllElementsByXpath('./descendant-or-self::a[@href]', preSS, doc).snapshotLength === 0 : (!preSS.hasAttribute('href') || _getFullHref(preSS.getAttribute('href')) == curLHref)))) {
                                            _nextlink = finalCheck(a, 'next');
                                            //alert(_nextlink);
                                        }
                                        continue;
                                    }
                                }
                            }
                        }

                        if (!_prelink) {
                            nextS1 = a.nextSibling;
                            nextS2 = a.nextElementSibling;

                            while (!(nextS1 || nextS2) && initSD < searchD) {
                                aP = aP.parentNode;
                                if (aP) {
                                    nextS1 = a.nextSibling;
                                    nextS2 = a.nextElementSibling;
                                }
                                initSD++;
                                //alert('initSD: '+initSD);
                            }
                            searchedD = initSD > 0 ? true : false;

                            if (nextS1 || nextS2) {
                                nSNText = nextS1 ? nextS1.textContent.match(DCRE) : '';
                                if (nSNText) {
                                    nextSS = nextS1;
                                } else {
                                    nSNText = nextS2 ? nextS2.textContent.match(DCRE) : '';
                                    nextSS = nextS2;
                                }
                                //alert(nextS);
                                if (nSNText) {
                                    nSNText = nSNText[1];
                                    //alert(pSNText)
                                    if (_Number(nSNText) == _Number(numtext) + 1) {
                                        //alert(searchedD);
                                        nodeType = nextSS.nodeType;
                                        //alert(nodeType);
                                        if (nodeType == 3 || (nodeType == 1 && (searchedD ? _getAllElementsByXpath('./descendant-or-self::a[@href]', nextSS, doc).snapshotLength === 0 : (!nextSS.hasAttribute("href") || _getFullHref(nextSS.getAttribute('href')) == curLHref)))) {
                                            _prelink = finalCheck(a, 'pre');
                                            //alert(_prelink);
                                        }
                                    }
                                }
                            }
                        }
                        continue;
                    }
                }
            } else {
                atext = a.title;
            }
            if (!atext) {
                aimgs = a.getElementsByTagName('img');
                for (j = 0, jj = aimgs.length; j < jj; j++) {
                    aimg_x = aimgs[j];
                    atext = aimg_x.alt || aimg_x.title;
                    if (atext) break;
                }
            }
            if (!atext) continue;
            if (!_nextlink) {
                xbreak = false;
                for (k = 0; k < _nPKL; k++) {
                    keytext = _nextPageKey[k];
                    if (!(keytext.test(atext))) continue;
                    _nextlink = finalCheck(a, 'next');
                    xbreak = true;
                    break;
                }
                if (xbreak || _nextlink) continue;
            }
            if (!_prelink) {
                for (k = 0; k < _pPKL; k++) {
                    keytext = _prePageKey[k];
                    if (!(keytext.test(atext))) continue;
                    _prelink = finalCheck(a, 'pre');
                    break;
                }
            }
        }

        debug('������������:', i, '��ʱ:', new Date() - startTime, '����');

        if (!autoGetLink.checked) { //ֻ�ڵ�һ�μ���ʱ��,�׳���һҳ����.
            prelink = _prelink;
            autoGetLink.checked = true;
        }

        //alert(_nextlink);
        return _nextlink;
    }

    function parseKWRE() {
        function modifyPageKey(name, pageKey, pageKeyLength) {
            function strMTE(str) {
                return (str.replace(/\\/g, '\\\\')
                    .replace(/\+/g, '\\+')
                    .replace(/\./g, '\\.')
                    .replace(/\?/g, '\\?')
                    .replace(/\{/g, '\\{')
                    .replace(/\}/g, '\\}')
                    .replace(/\[/g, '\\[')
                    .replace(/\]/g, '\\]')
                    .replace(/\^/g, '\\^')
                    .replace(/\$/g, '\\$')
                    .replace(/\*/g, '\\*')
                    .replace(/\(/g, '\\(')
                    .replace(/\)/g, '\\)')
                    .replace(/\|/g, '\\|')
                    .replace(/\//g, '\\/'));
            }

            var pfwordl = autoMatch.pfwordl,
                sfwordl = autoMatch.sfwordl;

            var RE_enable_a = pfwordl[name].enable,
                RE_maxPrefix = pfwordl[name].maxPrefix,
                RE_character_a = pfwordl[name].character,
                RE_enable_b = sfwordl[name].enable,
                RE_maxSubfix = sfwordl[name].maxSubfix,
                RE_character_b = sfwordl[name].character;
            var plwords,
                slwords,
                rep;

            plwords = RE_maxPrefix > 0 ? ('[' + (RE_enable_a ? strMTE(RE_character_a.join('')) : '.') + ']{0,' + RE_maxPrefix + '}') : '';
            plwords = '^\\s*' + plwords;
            //alert(plwords);
            slwords = RE_maxSubfix > 0 ? ('[' + (RE_enable_b ? strMTE(RE_character_b.join('')) : '.') + ']{0,' + RE_maxSubfix + '}') : '';
            slwords = slwords + '\\s*$';
            //alert(slwords);
            rep = prefs.cases ? '' : 'i';

            for (var i = 0; i < pageKeyLength; i++) {
                pageKey[i] = new RegExp(plwords + strMTE(pageKey[i]) + slwords, rep);
                //alert(pageKey[i]);
            }
            return pageKey;
        }

        //ת������.
        prePageKey = modifyPageKey('previous', prePageKey, prePageKey.length);
        nextPageKey = modifyPageKey('next', nextPageKey, nextPageKey.length);
    }

    // ��ַ������������.
    function hrefInc(obj, doc, win) {
        var _cplink = cplink;

        function getHref(href) {
            var mFails = obj.mFails;
            if (!mFails) return href;
            var str;
            if (typeof mFails == 'string') {
                str = mFails;
            } else {
                var fx;
                var array = [];
                var i, ii;
                var mValue;
                for (i = 0, ii = mFails.length; i < ii; i++) {
                    fx = mFails[i];
                    if (!fx) continue;
                    if (typeof fx == 'string') {
                        array.push(fx);
                    } else {
                        mValue = href.match(fx);
                        if (!mValue) return href;
                        array.push(mValue);
                    }
                }
                str = array.join('');
            }
            return str;
        }
        // alert(getHref(_cplink))

        var sa = obj.startAfter;
        var saType = typeof sa;
        var index;

        if (saType == 'string') {
            index = _cplink.indexOf(sa);
            if (index == -1) {
                _cplink = getHref(_cplink);
                index = _cplink.indexOf(sa);
                if (index == -1) return;
                //alert(index);
            }
        } else {
            var tsa = _cplink.match(sa);
            //alert(sa);
            if (!tsa) {
                _cplink = getHref(_cplink);
                sa = (_cplink.match(sa) || [])[0];
                if (!sa) return;
                index = _cplink.indexOf(sa);
                if (index == -1) return;
            } else {
                sa = tsa[0];
                index = _cplink.indexOf(sa);
                //alert(index)
                //alert(tsa.index)
            }
        }

        index += sa.length;
        var max = obj.max === undefined ? 9999 : obj.max;
        var min = obj.min === undefined ? 1 : obj.min;
        var aStr = _cplink.slice(0, index);
        var bStr = _cplink.slice(index);
        var nbStr = bStr.replace(/^(\d+)(.*)$/, function(a, b, c) {
            b = Number(b) + obj.inc;
            if (b >= max || b < min) return a;
            return b + c;
        });
        // alert(aStr+nbStr);
        if (nbStr !== bStr) {
            var ilresult;
            try {
                ilresult = obj.isLast(doc, unsafeWindow, _cplink);
            } catch (e) {}
            if (ilresult) return;
            return aStr + nbStr;
        }
    }

    // ��ȡ����Ԫ��,���
    function getElement(selector, contextNode, doc, win) {
        var ret;
        if (!selector) return ret;
        doc = doc || document;
        win = win || window;
        contextNode = contextNode || doc;
        var type = typeof selector;
        if (type == 'string') {
            if (selector.search(/^css;/i) === 0) {
                ret = getElementByCSS(selector.slice(4), contextNode);
            } else if (selector.toLowerCase() == 'auto;') {
                ret = autoGetLink(doc, win);
            } else {
                ret = getElementByXpath(selector, contextNode, doc);
            }
        } else if (type == 'function') {
            ret = selector(doc, win, cplink);
        } else if (selector instanceof Array) {
            for (var i = 0, l = selector.length; i < l; i++) {
                ret = getElement(selector[i], contextNode, doc, win);
                if (ret) {
                    break;
                }
            }
        } else {
            ret = hrefInc(selector, doc, win);
        }
        return ret;
    }
}


// ====================  libs  ==============================

// ����򻯰� underscroe �⣬�� ECMAScript 5
var _ = (function(){

    var nativeIsArray = Array.isArray;
    var _ = function(obj){
        if(obj instanceof _) return obj;
        if(!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    var toString = Object.prototype.toString;

    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };

    ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'].forEach(function(name){
        _['is' + name] = function(obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });

    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = function(obj, iterator, context){
        var result;
        obj.some(function(value, index, array){
            if(iterator.call(context, value, index, array)){
                result = value;
                return true;
            }
        });
        return result;
    };

    return _;
})();

/* jshint ignore:start */
//������
var Tween = {
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
};

var TweenM = [
    'Linear',
    'Quad',
    'Cubic',
    'Quart',
    'Quint',
    'Sine',
    'Expo',
    'Circ',
    'Elastic',
    'Back',
    'Bounce',
];

var TweenEase = [
    'easeIn',
    'easeOut',
    'easeInOut',
];
/* jshint ignore:end */


// ====================  functions  ==============================

function gmCompatible() {

    GM_addStyle = function(css, id){
        var s = document.createElement('style');
        if (id) {
            s.setAttribute(id, id);
        }
        s.setAttribute('type', 'text/css');
        s.setAttribute('style', 'display: none !important;');
        s.appendChild(document.createTextNode(css));
        return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
    };

    if (typeof unsafeWindow == "undefined") unsafeWindow = window;
    if (typeof GM_getValue != "undefined" && GM_getValue("a", "b") !== undefined) {
        return;
    }

    GM_getValue = function(key, defaultValue) {
        var value = window.localStorage.getItem(key);
        if (value === null) value = defaultValue;
        else if (value == 'true') value = true;
        else if (value == 'false') value = false;
        return value;
    };
    GM_setValue = function(key, value) {
        window.localStorage.setItem(key, value);
    };
    GM_registerMenuCommand = function() {};

    // chrome ԭ��֧��
    if (typeof GM_xmlhttpRequest == 'undefined') {
        GM_xmlhttpRequest = function(opt) {
            var req = new XMLHttpRequest();
            req.open('GET', opt.url, true);
            req.overrideMimeType(opt.overrideMimeType);
            req.onreadystatechange = function (aEvt) {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        opt.onload(req);
                    }
                    else {
                        opt.onerror();
                    }
                }
            };
            req.send(null);
        };
    }
}

// By lastDream2013 �Լ��޸ģ�ԭ��ֻ������ Firefox
function getRalativePageStr(lastUrl, currentUrl, nextUrl) {
    function getDigital(str) {
        var num = str.replace(/^p/i, '');
        return parseInt(num, 10);
    }

    var getRalativePageNumArray = function (lasturl, url) {
        if (!lasturl || !url) {
            return [0, 0];
        }

        var lasturlarray = lasturl.split(/-|\.|\&|\/|=|#|\?/),
            urlarray = url.split(/-|\.|\&|\/|=|#|\?/),
            url_info,
            lasturl_info;
        // һЩ url_info Ϊ p1,p2,p3 ֮���
        var handleInfo = function(s) {
            if (s) {
                return s.replace(/^p/, '');
            }
            return s;
        };
        while (urlarray.length !== 0) {
            url_info = handleInfo(urlarray.pop());
            lasturl_info = handleInfo(lasturlarray.pop());
            if (url_info != lasturl_info) {
                if (/[0-9]+/.test(url_info) && (url_info == "2" || /[0-9]+/.test(lasturl_info))) {
                    return [(parseInt(lasturl_info) || 1), parseInt(url_info)];
        }
            }
        }
        return [0, 0];
    };

    var ralativeOff;

    //��̳������������ҳ��ʾʵ��ҳ����Ϣ
    var ralativePageNumarray = [];
    if (nextUrl) {
        ralativePageNumarray = getRalativePageNumArray(currentUrl, nextUrl);
    } else {
        ralativePageNumarray = getRalativePageNumArray(lastUrl, currentUrl);
        ralativeOff = ralativePageNumarray[1] - ralativePageNumarray[0]; //�õ���һҳ�������Ϣ�Ƚϵģ�Ҫ�����ֵ����
        ralativePageNumarray[1] = ralativePageNumarray[1] + ralativeOff;
        ralativePageNumarray[0] = ralativePageNumarray[0] + ralativeOff;
    }

    // console.log('[��ȡʵ��ҳ��] ', 'Ҫ�Ƚϵ�3��ҳ����',arguments, '���õ��Ĳ�ֵ:', ralativePageNumarray);
    if (isNaN(ralativePageNumarray[0]) || isNaN(ralativePageNumarray[1])) {
        return '';
    }

    var realPageSiteMatch = false;
    ralativeOff = ralativePageNumarray[1] - ralativePageNumarray[0];
    //��һҳ����һҳ��ֵΪ1���������ֵ������10000(һ����̳Ҳ���ᳬ����ô��ҳ����)
    if (ralativeOff === 1 && ralativePageNumarray[1] < 10000) {
        realPageSiteMatch = true;
    }

    //��һҳ����һҳ��ֵ��Ϊ1������һҳ����һҳ��ֵ�ܱ���һҳ����һ���������ģ��й��ɵ�ҳ��
    if (!realPageSiteMatch && ralativeOff !== 1) {
        if ((ralativePageNumarray[1] % ralativeOff) === 0 && (ralativePageNumarray[0] % ralativeOff) === 0) {
            realPageSiteMatch = true;
        }
    }

    if (!realPageSiteMatch) { //�����������������ٸ��ݵ�ַ������ƥ��
        var sitePattern;
        for (var i = 0, length = REALPAGE_SITE_PATTERN.length; i < length; i++) {
            sitePattern = REALPAGE_SITE_PATTERN[i];
            if (currentUrl.toLocaleLowerCase().indexOf(sitePattern) >= 0) {
                realPageSiteMatch = true;
                break;
            }
        }
    }

    var ralativePageStr;
    if (realPageSiteMatch) { //���ƥ�����ʾʵ����ҳ��Ϣ
        if (ralativePageNumarray[1] - ralativePageNumarray[0] > 1) { //һ������������ĵ�xx - xx���
            ralativePageStr = ' [ ʵ�ʣ��� <font color="red">' + ralativePageNumarray[0] + ' - ' + ralativePageNumarray[1] + '</font> �� ]';
        } else if ((ralativePageNumarray[1] - ralativePageNumarray[0]) === 1) { //һ��ķ�ҳ������ֵӦ����1
            ralativePageStr = ' [ ʵ�ʣ��� <font color="red">' + ralativePageNumarray[0] + '</font> ҳ ]';
        } else if ((ralativePageNumarray[0] === 0 && ralativePageNumarray[1]) === 0) { //�Ҳ����Ļ�����
            ralativePageStr = ' [ <font color="red">ʵ����ҳ����</font> ]';
        }
    } else {
        ralativePageStr = '';
    }
    return ralativePageStr || '';
}

function handleLazyImgSrc(rule, doc) {
    var imgAttrs = rule.split('|');
    imgAttrs.forEach(function(attr){
        attr = attr.trim();
        [].forEach.call(doc.querySelectorAll("img[" + attr + "]"), function(img){
            var newSrc = img.getAttribute(attr);
            if (newSrc && newSrc != img.src) {
                img.setAttribute("src", newSrc);
                img.removeAttribute(attr);
            }
        });
    });
}

function removeScripts(node) {  // �Ƴ�Ԫ�ص� script
    var scripts = getAllElements('css;script', node);
    var scripts_x;
    for (i = scripts.length - 1; i >= 0; i--) {
        scripts_x = scripts[i];
        scripts_x.parentNode.removeChild(scripts_x);
    }
}

var noticeDiv;
var noticeDivto;
var noticeDivto2;
function notice(html_txt) {
    if (!noticeDiv) {
        var div = document.createElement('div');
        noticeDiv = div;
        div.style.cssText = '\
            position:fixed!important;\
            z-index:2147483647!important;\
            float:none!important;\
            width:auto!important;\
            height:auto!important;\
            font-size:13px!important;\
            padding:3px 20px 2px 5px!important;\
            background-color:#7f8f9c!important;\
            border:none!important;\
            color:#000!important;\
            text-align:left!important;\
            left:0!important;\
            bottom:0!important;\
            opacity:0;\
            -moz-border-radius:0 6px 0 0!important;\
            border-radius:0 6px 0 0!important;\
            -o-transition:opacity 0.3s ease-in-out;\
            -webkit-transition:opacity 0.3s ease-in-out;\
            -moz-transition:opacity 0.3s ease-in-out;\
        ';
        document.body.appendChild(div);
    }
    clearTimeout(noticeDivto);
    clearTimeout(noticeDivto2);
    noticeDiv.innerHTML = html_txt;
    noticeDiv.style.display = 'block';
    noticeDiv.style.opacity = '0.96';
    noticeDivto2 = setTimeout(function() {
        noticeDiv.style.opacity = '0';
    }, 1666);
    noticeDivto = setTimeout(function() {
        noticeDiv.style.display = 'none';
    }, 2000);
}

function $C(type, atArr, inner, action, listen) {
    var e = document.createElement(type);
    for (var at in atArr) {
        if (atArr.hasOwnProperty(at)) {
            e.setAttribute(at, atArr[at]);
        }
    }
    if (action && listen) {
        e.addEventListener(action, listen, false);
    }
    if (inner) {
        e.innerHTML = inner;
    }
    return e;
}

// css ��ȡ����Ԫ��
function getElementByCSS(css, contextNode) {
    return (contextNode || document).querySelector(css);
}

// css ��ȡ����Ԫ��
function getAllElementsByCSS(css, contextNode) {
    return (contextNode || document).querySelectorAll(css);
}

// xpath ��ȡ����Ԫ��
function getElementByXpath(xpath, contextNode, doc) {
    doc = doc || document;
    contextNode = contextNode || doc;
    return doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// xpath ��ȡ���Ԫ��.
function getAllElementsByXpath(xpath, contextNode, doc) {
    doc = doc || document;
    contextNode = contextNode || doc;
    return doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// ��ȡ���Ԫ��
function getAllElements(selector, contextNode, doc, win) {
    var ret = [];
    if (!selector) return ret;
    var Eles;
    doc = doc || document;
    win = win || window;
    contextNode = contextNode || doc;
    if (typeof selector == 'string') {
        if (selector.search(/^css;/i) === 0) {
            Eles = getAllElementsByCSS(selector.slice(4), contextNode);
        } else {
            Eles = getAllElementsByXpath(selector, contextNode, doc);
        }
    } else {
        Eles = selector(doc, win);
        if (!Eles) return ret;
        if (Eles.nodeType) { //����Ԫ��.
            ret[0] = Eles;
            return ret;
        }
    }

    function unique(array) { //����ȥ�ز��ұ�������˳��.
        var i, ca, ca2, j;
        for (i = 0; i < array.length; i++) {
            ca = array[i];
            for (j = i + 1; j < array.length; j++) {
                ca2 = array[j];
                if (ca2 == ca) {
                    array.splice(j, 1);
                    j--;
                }
            }
        }
        return array;
    }

    function makeArray(x) {
        var ret = [];
        var i, ii;
        var x_x;
        if (x.pop) { //��ͨ�� array
            for (i = 0, ii = x.length; i < ii; i++) {
                x_x = x[i];
                if (x_x) {
                    if (x_x.nodeType) { //��ͨ����,ֱ�ӷŽ�ȥ.
                        ret.push(x_x);
                    } else {
                        ret = ret.concat(makeArray(x_x)); //Ƕ�׵�.
                    }
                }
            }
            //alert(ret)
            return unique(ret);
        } else if (x.item) { //nodelist or HTMLcollection
            i = x.length;
            while (i) {
                ret[--i] = x[i];
            }
            /*
            for(i=0,ii=x.length;i<ii;i++){
                ret.push(x[i]);
            };
            */
            return ret;
        } else if (x.iterateNext) { //XPathResult
            i = x.snapshotLength;
            while (i) {
                ret[--i] = x.snapshotItem(i);
            }
            /*
            for(i=0,ii=x.snapshotLength;i<ii;i++){
                ret.push(x.snapshotItem(i));
            };
            */
            return ret;
        }
    }

    return makeArray(Eles);
}

// ��ȡ���һ��Ԫ��.
function getLastElement(selector, contextNode, doc, win) {
    var eles = getAllElements(selector, contextNode, doc, win);
    var l = eles.length;
    if (l > 0) {
        return eles[l - 1];
    }
}

function saveValue(key, value) {
    localStorage.setItem(key, encodeURIComponent(value));
}

function getValue(key) {
    var value = localStorage.getItem(key);
    return value ? decodeURIComponent(value) : undefined;
}

function createDocumentByString(str) {  // stringתΪDOM
    if (!str) {
        C.error('û���ҵ�Ҫת��DOM���ַ���');
        return;
    }
    if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml');
    }

    var doc;
    try {
        // firefox and chrome 30+��Opera 12 �ᱨ��
        doc = new DOMParser().parseFromString(str, 'text/html');
    } catch (ex) {}

    if (doc) {
        return doc;
    }

    if (document.implementation.createHTMLDocument) {
        doc = document.implementation.createHTMLDocument('superPreloader');
    } else {
        try {
            doc = document.cloneNode(false);
            doc.appendChild(doc.importNode(document.documentElement, false));
            doc.documentElement.appendChild(doc.createElement('head'));
            doc.documentElement.appendChild(doc.createElement('body'));
        } catch (e) {}
    }
    if (!doc) return;
    var range = document.createRange();
    range.selectNodeContents(document.body);
    var fragment = range.createContextualFragment(str);
    doc.body.appendChild(fragment);
    var headChildNames = {
        TITLE: true,
        META: true,
        LINK: true,
        STYLE: true,
        BASE: true
    };
    var child;
    var body = doc.body;
    var bchilds = body.childNodes;
    for (var i = bchilds.length - 1; i >= 0; i--) { //�Ƴ�head����Ԫ��
        child = bchilds[i];
        if (headChildNames[child.nodeName]) body.removeChild(child);
    }
    //alert(doc.documentElement.innerHTML);
    //debug(doc);
    //debug(doc.documentElement.innerHTML);
    return doc;
}

// �����·����a.href��ȡ��ȫ��hrefֵ.
function getFullHref(href) {
    if (typeof href != 'string') href = href.getAttribute('href');
    //alert(href);
    //if(href.search(/^https?:/)==0)return href;//http��ͷ,��һ������������href;
    var a = getFullHref.a;
    if (!a) {
        getFullHref.a = a = document.createElement('a');
    }
    a.href = href;
    //alert(a.href);
    return a.href;
}

// �κ�ת���ַ������洢���޸Ĺ�
function xToString(x) {
    function toStr(x) {
        switch (typeof x) {
            case 'undefined':
                return Str(x);
            case 'boolean':
                return Str(x);
            case 'number':
                return Str(x);
            case 'string':
                return ('"' +
                    (x.replace(/(?:\r\n|\n|\r|\t|\\|")/g, function(a) {
                        var ret;
                        switch (a) { //ת��������
                            case '\r\n':
                                ret = '\\r\\n';
                                break;
                            case '\n':
                                ret = '\\n';
                                break;
                            case '\r':
                                ret = '\\r';
                                break;
                            case '\t':
                                ret = '\\t';
                                break;
                            case '\\':
                                ret = '\\\\';
                                break;
                            case '"':
                                ret = '\\"';
                                break;
                            default:
                                break;
                        }
                        return ret;
                    })) + '"');
            case 'function':
                var fnStr = Str(x);
                return fnStr.indexOf('native code') == -1 ? fnStr : 'function(){}';
            case 'object':
                //ע,object�ĳ��˵���{},�����Ķ�������Ի���ɶ�ʧ..
                if (x === null) {
                    return Str(x);
                }
                switch (x.constructor.name) {
                    case "Object":
                        var i;
                        var rStr = '';
                        for (i in x) {
                            if (!x.hasOwnProperty(i)) { //ȥ��ԭ�����ϵ�����.
                                continue;
                            }
                            rStr += toStr(i) + ':' + toStr(x[i]) + ',';
                        }
                        return ('{' + rStr.replace(/,$/i, '') + '}');
                    case "Array":
                        var i;
                        var rStr = '';
                        for (i in x) {
                            if (!x.hasOwnProperty(i)) { //ȥ��ԭ�����ϵ�����.
                                continue;
                            }
                            rStr += toStr(x[i]) + ',';
                        }
                        return '[' + rStr.replace(/,$/i, '') + ']';
                    case "String":
                        return toStr(Str(x));
                    case "RegExp":
                        return Str(x);
                    case "Number":
                        return Str(x);
                    case "Boolean":
                        return Str(x);
                    default:
                        //alert(x.constructor);//©��ʲô����ô?
                        break;
                }
            default:
                break;
        }
    }
    var Str = String;
    return toStr(x);
}

function toRE(obj) {
    if (obj instanceof RegExp) {
        return obj;
    } else if (obj instanceof Array) {
        return new RegExp(obj[0], obj[1]);
    } else {
        if (obj.search(/^wildc;/i) === 0) {
            obj = wildcardToRegExpStr(obj.slice(6));
        }
        return new RegExp(obj);
    }
}

function wildcardToRegExpStr(urlstr) {
    if (urlstr.source) return urlstr.source;
    var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
        return str === "*" ? ".*" : "[^/]*";
    });
    return "^" + reg + "$";
}


SP.init();

})();
