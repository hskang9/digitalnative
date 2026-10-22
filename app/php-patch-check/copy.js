// Bilingual copy for /php-patch-check. Facts come from the PHP security advisory
// (https://www.php.net/archive/2026.php#2026-10-21-5) and the CISA alert of 21 Oct 2026.

export const FIXED = { "8.5": "8.5.12", "8.4": "8.4.27", "8.3": "8.3.36", "8.2": "8.2.35" };
export const MAX_BULK = 10;
export const CONTACT_EMAIL = "contact@digitalnative.vip";
export const ADVISORY_URL = "https://www.php.net/archive/2026.php#2026-10-21-5";
export const CISA_URL = "https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching";

export const C = {
  chip: { en: "PHP2Shell · CVE-2026-109618 & CVE-2026-109619 · Critical", ko: "PHP2Shell · CVE-2026-109618 · CVE-2026-109619 · 심각" },
  h1: { en: "A critical PHP flaw can hand your whole server to an attacker.", ko: "PHP의 치명적 결함으로 서버 전체가 공격자에게 넘어갈 수 있습니다." },
  lead: {
    en: "On 21 October 2026 PHP shipped an emergency fix for two flaws that let anyone run their own code on a PHP server, with no password. Exploit code is already public. Check whether a site still needs the update.",
    ko: "2026년 10월 21일, PHP가 긴급 보안 업데이트를 내놓았습니다. 두 가지 결함 때문에 누구든 비밀번호 없이 PHP 서버에서 원하는 코드를 실행할 수 있었고, 공격 코드는 이미 공개되었습니다. 내 사이트에 업데이트가 필요한지 확인해 보세요.",
  },
  siteLabel: { en: "Website address", ko: "웹사이트 주소" },
  checkBtn: { en: "Check this site", ko: "사이트 점검" },
  checking: { en: "Checking…", ko: "점검 중…" },
  checkerNote: {
    en: "We read the site from the outside, like a visitor: the home page and at most two ordinary PHP pages. Nothing you enter is stored.",
    ko: "방문자처럼 바깥에서만 읽습니다. 첫 페이지와 일반 PHP 페이지 최대 두 개만 요청하며, 입력한 주소는 저장하지 않습니다.",
  },
  manualSummary: { en: "Already know your PHP version? Check it by hand", ko: "PHP 버전을 이미 알고 있나요? 직접 확인하기" },
  manualLabel: { en: "Your PHP version", ko: "사용 중인 PHP 버전" },
  manualPick: { en: "Choose a version…", ko: "버전 선택…" },
  fixedEyebrow: { en: "Fixed releases · 21 Oct 2026", ko: "패치된 버전 · 2026년 10월 21일" },
  fixedNote: {
    en: "PHP 8.1, 8.0 and 7.4 get no release, only raw source patches for people who build PHP themselves. Older than 7.4: nothing.",
    ko: "PHP 8.1, 8.0, 7.4는 정식 릴리스가 없고, PHP를 직접 빌드하는 사람을 위한 소스 패치만 공개되었습니다. 7.4보다 오래된 버전은 아무것도 없습니다.",
  },
  severityEyebrow: { en: "Severity", ko: "심각도" },
  severityNote: { en: "Critical. Remote code execution without logging in.", ko: "심각. 로그인 없이 원격 코드 실행이 가능합니다." },
  scopeEyebrow: { en: "Who is affected", ko: "영향 범위" },
  scopeNote: {
    en: "Every PHP install that serves web pages: PHP-FPM, Apache mod_php, php-cgi, FrankenPHP and LiteSpeed. Risk is highest on mod_php, where the attack works before any site code runs.",
    ko: "웹 페이지를 제공하는 모든 PHP 설치: PHP-FPM, Apache mod_php, php-cgi, FrankenPHP, LiteSpeed. 사이트 코드가 실행되기도 전에 공격이 가능한 mod_php가 가장 위험합니다.",
  },
  bulkEyebrow: { en: "Agencies, IT teams, multi-site owners", ko: "에이전시 · IT팀 · 여러 사이트 운영자" },
  bulkH: { en: "Check up to 10 sites at once", ko: "최대 10개 사이트를 한 번에 점검" },
  bulkP: {
    en: "Paste up to ten sites and get one list, worst first: which are on an end-of-life version, which still need the update, and which hide their version. Then send us the list for one review and one quote for all of them.",
    ko: "최대 10개 사이트를 붙여넣으면 가장 위험한 순서로 정리된 목록 하나를 받습니다. 지원 종료 버전, 아직 업데이트가 필요한 곳, 버전을 숨긴 곳을 한눈에 볼 수 있고, 그 목록을 보내주시면 전체를 한 번에 검토하고 견적을 드립니다.",
  },
  bulkMore: {
    en: "More than ten, or client sites you are responsible for? Ask for a portfolio review and we will go through all of them.",
    ko: "10개가 넘거나 책임지고 있는 고객 사이트가 있나요? 포트폴리오 검토를 요청하시면 전부 살펴봐 드립니다.",
  },
  bulkMoreLink: { en: "Ask for a portfolio review →", ko: "포트폴리오 검토 요청 →" },
  bulkMoreSubject: { en: "PHP2Shell: portfolio review", ko: "PHP2Shell: 포트폴리오 검토 요청" },
  bulkHint: {
    en: "Your own sites, your clients' or your company's. Each is read from the outside, the same as the single check. No addresses are stored.",
    ko: "내 사이트, 고객 사이트, 회사 사이트 모두 가능합니다. 단일 점검과 똑같이 바깥에서만 읽으며, 주소는 저장하지 않습니다.",
  },
  bulkSlow: { en: "Old sites can take up to 30 seconds each.", ko: "오래된 사이트는 하나에 최대 30초까지 걸릴 수 있습니다." },
  bulkSend: { en: "Send this list for one review and one quote", ko: "이 목록 보내고 한 번에 검토·견적 받기" },
  bulkSendSubject: { en: "PHP2Shell: review my sites", ko: "PHP2Shell: 사이트 일괄 검토 요청" },
  bulkSendIntro: {
    en: "Hi Digital Native, please review these sites (results from your PHP2Shell checker, worst first):",
    ko: "안녕하세요 Digital Native, 아래 사이트들 검토 부탁드립니다 (PHP2Shell 점검 결과, 위험한 순서):",
  },
  heroMulti: { en: "Look after several sites? Check up to 10 at once ↓", ko: "여러 사이트를 관리하나요? 최대 10개 한 번에 점검 ↓" },
  bulkLabel: { en: "Sites to check, one per line", ko: "점검할 사이트 (한 줄에 하나)" },
  bulkBtn: { en: "Check all", ko: "모두 점검" },
  bulkTooMany: { en: `Only the first ${MAX_BULK} will be checked.`, ko: `앞의 ${MAX_BULK}개만 점검합니다.` },
  insideEyebrow: { en: "The exact answer", ko: "정확한 답" },
  insideH: { en: "Read the exact version from inside your own site", ko: "내 사이트 안에서 정확한 버전 확인하기" },
  insideP: {
    en: "From the outside, a site that hides its version can only be identified as PHP. This small file shows the exact version once and then deletes itself. It sends nothing anywhere, and you can only put it on a server you control.",
    ko: "버전을 숨긴 사이트는 바깥에서 PHP라는 것까지만 알 수 있습니다. 이 작은 파일은 정확한 버전을 한 번 보여주고 스스로 삭제됩니다. 어디로도 데이터를 보내지 않으며, 내가 관리하는 서버에만 올릴 수 있습니다.",
  },
  inside: [
    { en: "Download check-php.php, or copy the code.", ko: "check-php.php를 내려받거나 코드를 복사합니다." },
    { en: "Upload it to your site's main folder (where index.php is).", ko: "사이트의 기본 폴더(index.php가 있는 곳)에 업로드합니다." },
    { en: "Open yourdomain.com/check-php.php in a browser.", ko: "브라우저에서 yourdomain.com/check-php.php를 엽니다." },
    { en: "Read the result. The file removes itself; if it says it could not, delete it by hand.", ko: "결과를 확인합니다. 파일은 스스로 삭제되며, 삭제하지 못했다고 나오면 직접 지워주세요." },
  ],
  copy: { en: "Copy", ko: "복사" },
  copied: { en: "Copied", ko: "복사됨" },
  download: { en: "Download", ko: "다운로드" },
  nowEyebrow: { en: "Do this today", ko: "오늘 해야 할 일" },
  nowH: { en: "What to do, in order", ko: "순서대로 하세요" },
  nowP: { en: "Exploit code is public, so the window between patch and attack is short.", ko: "공격 코드가 공개되어 있어 패치와 공격 사이의 시간이 짧습니다." },
  now: [
    {
      t: { en: "Find your PHP version.", ko: "PHP 버전을 확인하세요." },
      d: { en: "Use the checker above, your hosting panel, or run php -v on the server.", ko: "위 점검 도구, 호스팅 관리 화면, 또는 서버에서 php -v 를 실행해 확인합니다." },
    },
    {
      t: { en: "On 8.2 to 8.5: update now.", ko: "8.2 ~ 8.5라면: 지금 업데이트하세요." },
      d: {
        en: "Install 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then restart PHP-FPM or the web server so the fixed code is what actually runs.",
        ko: "8.5.12, 8.4.27, 8.3.36, 8.2.35 중 해당 버전을 설치한 뒤, PHP-FPM이나 웹 서버를 재시작해야 고쳐진 코드가 실제로 실행됩니다.",
      },
    },
    {
      t: { en: "On a host or a Linux distribution package: ask in writing.", ko: "호스팅이나 리눅스 배포판 패키지를 쓴다면: 서면으로 물어보세요." },
      d: {
        en: "Distributions and long-term-support vendors received the patch in advance and may ship it under the old version number. Ask your host or vendor whether your server has the fix.",
        ko: "배포판과 장기 지원(LTS) 업체는 패치를 미리 받았고, 기존 버전 번호 그대로 배포할 수 있습니다. 내 서버에 패치가 적용됐는지 호스팅사나 업체에 확인하세요.",
      },
    },
    {
      t: { en: "On 8.1 or older: there is no update to install.", ko: "8.1 이하라면: 설치할 업데이트가 없습니다." },
      d: {
        en: "Move to a supported version (8.2 or newer). If that cannot happen today, consider taking the site offline until it can, as CISA advises.",
        ko: "지원되는 버전(8.2 이상)으로 옮겨야 합니다. 오늘 당장 어렵다면 CISA 권고대로 그때까지 사이트를 내려두는 것을 검토하세요.",
      },
    },
    {
      t: { en: "Stopgaps only buy time.", ko: "임시 조치는 시간을 벌 뿐입니다." },
      d: {
        en: "PHP's advisory lists measures that reduce exposure but do not make a server safe, such as session.upload_progress.enabled=0 set in php.ini (not with ini_set or .user.ini) followed by a restart of every worker. Read the full list on php.net.",
        ko: "PHP 공식 권고문에는 위험을 줄이지만 안전하게 만들지는 못하는 조치들이 나와 있습니다. 예: php.ini에 session.upload_progress.enabled=0 설정(ini_set이나 .user.ini는 효과 없음) 후 모든 워커 재시작. 전체 목록은 php.net에서 확인하세요.",
      },
      link: ADVISORY_URL,
    },
    {
      t: { en: "Then check nothing got in.", ko: "그다음, 침입 흔적을 확인하세요." },
      d: {
        en: "Look for admin users you did not create, files you did not upload, and recently changed PHP files. A site that was exposed before the patch may already carry a backdoor.",
        ko: "직접 만들지 않은 관리자 계정, 올린 적 없는 파일, 최근 수정된 PHP 파일을 찾아보세요. 패치 전에 노출됐던 사이트에는 이미 백도어가 있을 수 있습니다.",
      },
    },
  ],
  mythEyebrow: { en: "Common mistakes", ko: "흔한 오해" },
  mythH: { en: "What does not fix it", ko: "이것으로는 해결되지 않습니다" },
  myths: [
    {
      t: { en: "Updating WordPress, plugins or themes", ko: "워드프레스, 플러그인, 테마 업데이트" },
      d: { en: "The flaw is in PHP itself. Automatic WordPress updates do not touch it.", ko: "결함은 PHP 자체에 있습니다. 워드프레스 자동 업데이트로는 고쳐지지 않습니다." },
    },
    {
      t: { en: "Hiding the PHP version", ko: "PHP 버전 숨기기" },
      d: { en: "Attackers do not need to know the version. They send the attack to everything.", ko: "공격자는 버전을 알 필요가 없습니다. 모든 서버에 공격을 보냅니다." },
    },
    {
      t: { en: "Installing the update without a restart", ko: "재시작 없이 업데이트만 설치" },
      d: { en: "PHP-FPM and Apache keep running the old code until they are restarted.", ko: "PHP-FPM과 Apache는 재시작하기 전까지 예전 코드를 그대로 실행합니다." },
    },
    {
      t: { en: "“It's just a small brochure site”", ko: "“작은 소개용 사이트일 뿐인데요”" },
      d: {
        en: "Attackers scan the whole internet automatically. Forgotten sites, staging copies and old landing pages are the usual way in.",
        ko: "공격자는 인터넷 전체를 자동으로 훑습니다. 잊힌 사이트, 스테이징 사본, 오래된 랜딩 페이지가 주된 침입 경로입니다.",
      },
    },
  ],
  timeEyebrow: { en: "What has happened", ko: "지금까지의 상황" },
  timeH: { en: "Timeline", ko: "타임라인" },
  timeline: [
    {
      date: { en: "21 Oct 2026", ko: "2026년 10월 21일" },
      d: {
        en: "PHP releases 8.5.12, 8.4.27, 8.3.36 and 8.2.35 to fix CVE-2026-109618 (out-of-memory corruption) and CVE-2026-109619 (stale global state), both allowing unauthenticated remote code execution.",
        ko: "PHP가 8.5.12, 8.4.27, 8.3.36, 8.2.35를 배포해 CVE-2026-109618(메모리 부족 처리 중 손상)과 CVE-2026-109619(남아 있는 전역 상태)를 수정했습니다. 두 결함 모두 인증 없는 원격 코드 실행이 가능합니다.",
      },
      source: ["php.net", ADVISORY_URL],
    },
    {
      date: { en: "21 Oct 2026", ko: "2026년 10월 21일" },
      d: {
        en: "CISA urges organisations to patch immediately, and says systems that cannot be updated, or that run PHP 8.1 or earlier, should be taken offline until patched.",
        ko: "미국 사이버보안 기관 CISA가 즉시 패치를 강력히 권고하고, 업데이트할 수 없거나 PHP 8.1 이하를 쓰는 시스템은 패치 전까지 오프라인으로 전환하라고 밝혔습니다.",
      },
      source: ["CISA", CISA_URL],
    },
    {
      date: { en: "21 Oct 2026", ko: "2026년 10월 21일" },
      d: {
        en: "PHP publishes minimal source patches for 7.4, 8.0 and 8.1 for people who build PHP themselves. Versions before 7.4 get nothing.",
        ko: "PHP가 직접 빌드하는 사용자를 위해 7.4, 8.0, 8.1용 최소 소스 패치를 공개했습니다. 7.4 이전 버전은 아무것도 없습니다.",
      },
      source: ["php.net", ADVISORY_URL],
    },
  ],
  sources: { en: "Sources:", ko: "출처:" },
  shareH: { en: "Know someone who runs a website?", ko: "웹사이트를 운영하는 지인이 있나요?" },
  shareP: {
    en: "Most site owners do not know which PHP version they are on. Sending them this page takes a minute.",
    ko: "대부분의 사이트 운영자는 자기 PHP 버전을 모릅니다. 이 페이지를 보내는 데 1분이면 충분합니다.",
  },
  email: { en: "Email", ko: "이메일" },
  copyLink: { en: "Copy link", ko: "링크 복사" },
  shareText: {
    en: "A critical PHP flaw (PHP2Shell) lets attackers take over servers. Check if your site needs the update:",
    ko: "PHP의 치명적 결함(PHP2Shell)으로 서버가 탈취될 수 있습니다. 내 사이트에 업데이트가 필요한지 확인해 보세요:",
  },
  helpH: { en: "Need it checked or fixed?", ko: "점검이나 조치가 필요하신가요?" },
  helpP: {
    en: "Send us your site, or the list of sites you look after. We will tell you what each one runs, whether it is exposed, and what it would take to fix, before anyone touches anything.",
    ko: "사이트 주소나 관리 중인 사이트 목록을 보내주세요. 손대기 전에 각 사이트가 무엇으로 돌아가는지, 노출되어 있는지, 고치려면 무엇이 필요한지 알려드립니다.",
  },
  helpBtn: { en: "Email Digital Native", ko: "Digital Native에 이메일 보내기" },
  helpSubject: { en: "PHP2Shell: please check my site", ko: "PHP2Shell: 사이트 점검 요청" },
  foot1: {
    en: "This checker reads publicly visible responses only. A version shown in headers can be out of date or rewritten by a host, so treat the result as a strong hint, not a guarantee.",
    ko: "이 도구는 공개적으로 보이는 응답만 읽습니다. 헤더에 보이는 버전은 오래됐거나 호스팅사가 바꿔 놓았을 수 있으니, 결과는 확정이 아닌 강한 단서로 봐주세요.",
  },
  foot2: {
    en: "Not affiliated with The PHP Group. Facts are taken from the PHP security advisory and the CISA alert of 21 October 2026.",
    ko: "The PHP Group과 관련이 없습니다. 내용은 2026년 10월 21일 PHP 보안 권고문과 CISA 경보를 근거로 합니다.",
  },
  backHome: { en: "Digital Native home", ko: "Digital Native 홈" },
};

// Result copy. Each entry returns { en, ko } for the given facts.
export const STATUS = {
  patched: { en: "Patched", ko: "패치됨" },
  vulnerable: { en: "Update needed", ko: "업데이트 필요" },
  eol: { en: "End of life: no official fix", ko: "지원 종료: 공식 패치 없음" },
  "needs-patch-level": { en: "Check the exact version", ko: "정확한 버전 확인 필요" },
  hidden: { en: "PHP found, version hidden", ko: "PHP 사용, 버전 숨김" },
  "not-php": { en: "No PHP you manage", ko: "직접 관리하는 PHP 아님" },
  "no-signs": { en: "No PHP signs from outside", ko: "바깥에서 PHP 흔적 없음" },
};

export const DETAIL = {
  patched: ({ v }) => ({
    en: `PHP ${v} already includes the fix. Make sure PHP was restarted after the update.`,
    ko: `PHP ${v}에는 이미 패치가 들어 있습니다. 업데이트 후 PHP를 재시작했는지 확인하세요.`,
  }),
  vulnerable: ({ v, fixed }) => ({
    en: `PHP ${v} is before the fixed release. Update to ${fixed} or newer and restart PHP.`,
    ko: `PHP ${v}는 패치 이전 버전입니다. ${fixed} 이상으로 업데이트하고 PHP를 재시작하세요.`,
  }),
  eol: ({ v }) => ({
    en: `PHP ${v} gets no official release for this flaw. Move to PHP 8.2 or newer, or get written confirmation that your host or vendor applied a backported patch.`,
    ko: `PHP ${v}에는 이 결함에 대한 공식 릴리스가 없습니다. PHP 8.2 이상으로 옮기거나, 호스팅사·업체가 백포트 패치를 적용했다는 서면 확인을 받으세요.`,
  }),
  "needs-patch-level": ({ branch, fixed }) => ({
    en: `The ${branch} branch is fixed from ${fixed}. Find the exact version with the inside check below.`,
    ko: `${branch} 브랜치는 ${fixed}부터 패치되었습니다. 아래 내부 확인으로 정확한 버전을 알아보세요.`,
  }),
  hidden: ({ platforms }) => ({
    en: `This site runs ${platforms || "PHP"} but does not show its PHP version. Use the inside check below, or ask your host which version it runs.`,
    ko: `이 사이트는 ${platforms || "PHP"}로 운영되지만 PHP 버전을 공개하지 않습니다. 아래 내부 확인을 하거나 호스팅사에 버전을 문의하세요.`,
  }),
  "not-php": ({ platforms }) => ({
    en: `${platforms ? `This looks like ${platforms}. ` : ""}The site does not appear to run PHP that you maintain. Other sites or subdomains you own still might.`,
    ko: `${platforms ? `${platforms}로 보입니다. ` : ""}직접 관리하는 PHP로 운영되는 사이트는 아닌 것 같습니다. 다른 사이트나 서브도메인은 해당될 수 있습니다.`,
  }),
  "no-signs": () => ({
    en: "Nothing points to PHP from the outside, but that is not proof: many PHP sites hide every trace. If you know it is PHP, use the inside check.",
    ko: "바깥에서는 PHP 흔적이 보이지 않지만 확실하지는 않습니다. 흔적을 모두 숨기는 PHP 사이트도 많습니다. PHP인 걸 안다면 내부 확인을 해보세요.",
  }),
  distro: ({ full }) => ({
    en: `The version (${full}) looks like a Linux distribution build. Distributions often backport fixes without changing the version number, so check your vendor's security notice before assuming the worst.`,
    ko: `버전(${full})이 리눅스 배포판 빌드로 보입니다. 배포판은 버전 번호를 바꾸지 않고 패치를 넣는 경우가 많으니, 최악을 가정하기 전에 배포판 보안 공지를 확인하세요.`,
  }),
};

export const ERRORS = {
  invalid_url: { en: "That does not look like a web address.", ko: "웹 주소 형식이 아닙니다." },
  blocked_host: { en: "That address can't be checked. Only public websites on ports 80 and 443 are allowed.", ko: "이 주소는 점검할 수 없습니다. 80·443 포트의 공개 웹사이트만 가능합니다." },
  unreachable: { en: "Could not reach this site. Check the spelling, or the site may be down.", ko: "사이트에 연결할 수 없습니다. 주소를 확인하거나, 사이트가 다운됐을 수 있습니다." },
  timeout: { en: "The site took too long to answer. Old sites can be slow; try again.", ko: "사이트 응답이 너무 늦습니다. 오래된 사이트는 느릴 수 있으니 다시 시도해 주세요." },
  rate_limited: { en: "Too many checks at once. Wait a minute and try again.", ko: "점검 요청이 너무 많습니다. 1분 뒤 다시 시도해 주세요." },
};

export const META_LABELS = {
  platform: { en: "Platform", ko: "플랫폼" },
  checked: { en: "Checked", ko: "점검한 주소" },
};
