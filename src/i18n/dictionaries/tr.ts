import type { Dictionary } from "../types";

const EXTENSION = "portdeveloper/se2-monad-extension";
// Keep in lockstep with the EN dictionary — same pinned commit, same
// hashes. Regenerate via tools/refresh-bootstrap-checksums.sh in the
// se2-workshop-windows-setup repo.
const PINNED_REF = "3a3e22283de2b608704db7e6164dff491c4b22ca";
const RAW_BASE =
  `https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/${PINNED_REF}`;
const SHA = {
  windows: "20fd5c7a149d6bcce4173836acd8e8500ffbfe70569c4d132ca462454eb762fd",
  wsl: "df52dae4d9594f8708af5b5ca2e413148c45b180596340e28663bcbdc29e6548",
  mac: "eb8b08a743e036db6eb6243bbad20165c38c92e58099b0facfbaa3de08a957f4",
};

const winInstall = (script: string, sha: string) =>
  `$url = '${RAW_BASE}/${script}'
$tmp = "$env:TEMP\\workshop-bootstrap.ps1"
Invoke-WebRequest -Uri $url -OutFile $tmp
if ((Get-FileHash $tmp -Algorithm SHA256).Hash.ToLower() -eq '${sha}') { PowerShell -NoProfile -ExecutionPolicy Bypass -File $tmp } else { Write-Error 'Hata: Checksum eşleşmedi! Güvenliğe bildir!' }`;

const shInstall = (script: string, sha: string) =>
  `url='${RAW_BASE}/${script}'
tmp=$(mktemp) && curl -fsSLo "$tmp" "$url"
if [ "$(sha256sum "$tmp" | awk '{print $1}')" = '${sha}' ]; then bash "$tmp"; else echo 'Hata: Checksum eşleşmedi! Güvenliğe bildir!' >&2; fi`;

export const tr: Dictionary = {
  meta: {
    title: "Monad geliştirici ortamını kur",
    description:
      "Monad Testnet'e önceden bağlı Scaffold-ETH 2 (Foundry) atölyeleri için tek komutluk kurulum. Windows, macOS ve Linux.",
  },
  header: {
    wordmark: "setup.devnads.com",
    repo: "Repo",
    githubAria: "GitHub",
  },
  hero: {
    title: "Makineni Monad için hazırla.",
    body: "İşletim sistemini seç ve tek satırı çalıştır. Düzgün bir bağlantıda 10 dakikadan kısa sürer.",
  },
  manualCta: {
    template: "{os} için manuel kurulumu gör.",
  },
  afterInstall: {
    title: "Geliştirmeye başlamak için bunları çalıştır.",
    body:
      "Proje dizini içinde üç terminal aç. Birincisi yerel bir Anvil node'u başlatır, ikincisi sözleşmeleri ona deploy eder, üçüncüsü dapp'i sunar.",
    note:
      "Daha sonra Monad Testnet'e deploy etmek için: gh auth login, yarn deploy --network monadTestnet.",
  },
  wallet: {
    title: "Cüzdanın var mı?",
    body:
      "Dapp'inle tarayıcıda etkileşmek ve UI'dan işlem imzalamak için bir cüzdan isteyeceksin. Yoksa [MetaMask](https://metamask.io)'i kap. (Deploy keystore'u ayrıdır ve 4. adımda senin için kuruldu.)",
  },
  faucet: {
    title: "Deploy için biraz MON kap.",
    body:
      "Cüzdan adresini bırak, testnet MON'u doğrudan ona göndereceğiz. Adres ve IP başına oran sınırlı.",
    placeholder: "0xCüzdanAdresin",
    button: "MON Damlat",
    sending: "Gönderiliyor",
    successTitle: "MON adresine damlatıldı.",
    invalidAddress: "Bu geçerli bir 0x adresine benzemiyor (40 hex karakter).",
    networkError: "Ağ hatası.",
    fallbackError: "Musluk {status} döndü.",
  },
  troubleshooting: {
    title: "İşler ters gittiğinde.",
    items: {
      wsl: {
        title: 'wsl --install "feature not enabled" diyor',
        body:
          "Donanım sanallaştırması BIOS'ta kapalı. BIOS/UEFI'ye girip `Intel VT-x` veya `AMD-V` (bazen `SVM` olarak etiketlenir) seçeneğini aç. [Microsoft'un rehberi](https://support.microsoft.com/en-us/windows/enable-virtualization-on-windows-11-pcs-c5578302-6e43-4b4b-a449-8ced115f58e1) ve [WSL troubleshooting dokümanı](https://learn.microsoft.com/windows/wsl/troubleshooting) üretici bazında adım adım anlatıyor.",
      },
      forge: {
        title: "Kurulumdan sonra forge: command not found",
        body:
          "Terminali kapatıp tekrar aç. Foundry kurulumu `~/.bashrc` dosyasına eklenir; bu sadece yeni shell'lerde geçerli olur.",
      },
      nodeGyp: {
        title: "yarn install yerel derleme hatalarıyla başarısız oluyor",
        body:
          "`node-gyp` Python ve derleme araçları ister. Bootstrap bunları kurar; eğer atladıysan `sudo apt install -y build-essential python3` (Linux/WSL) veya `xcode-select --install` (macOS) komutunu çalıştırıp tekrar dene.",
      },
      gitConfig: {
        title: "create-eth: Git user.name is not configured",
        body:
          "create-eth, scaffold etmeden önce Git kimliği ister. `git config --global user.name \"Adın\"` ve `git config --global user.email \"sen@ornek.com\"` komutlarını çalıştırıp tekrar dene.",
      },
      corepackEACCES: {
        title: "macOS / Linux'ta corepack enable EACCES hatası veriyor",
        body:
          "Node'un sistem genelinde kurulu (Homebrew, apt veya resmi .pkg), bu yüzden corepack `/usr/local/bin`'e root olmadan symlink yazamıyor. Ya yukarıdaki nvm parçacığıyla Node'u kur (önerilen — her şey home dizininde kalır, sudo gerekmez), ya da tek seferlik `sudo corepack enable` çalıştır.",
      },
      localhost: {
        title: "localhost:3000 Windows tarayıcısında açılmıyor",
        body:
          "Önce `yarn start`'ın Ubuntu içinde gerçekten çalıştığından emin ol. Çalışıyorsa PowerShell'de `wsl --shutdown` çalıştır, Ubuntu'yu yeniden aç ve tekrar dene. WSL2, localhost'u otomatik iletir. Windows Firewall ilk açılışta arada müdahale edebilir.",
      },
      slow: {
        title: "WSL içinde dosyalar yavaş",
        body:
          "Projeni WSL içinde `~/` altında tut (örn. `/home/sen/my-monad-dapp`), `/mnt/c/...` altında değil. Dosya sistemleri arası I/O, WSL'nin bir numaralı performans tuzağıdır.",
      },
      mon: {
        title: "Monad Testnet'e deploy etmek için MON lazım",
        body:
          "Yukarıdaki musluk kartını kullan ya da [Monad dokümanlarındaki](https://docs.monad.xyz) resmi musluktan testnet MON al. Sonra `yarn account:import` ile deployer anahtarını yükle ve `yarn deploy --network monadTestnet` ile deploy et.",
      },
    },
  },
  stillStuck: {
    body:
      "Bu sayfanın URL'sini herhangi bir yapay zeka kodlama ajanına (Claude, ChatGPT, Gemini, Cursor) yapıştırıp sor. Modelin elinde her komut ve sorun giderme notu düz markup olarak var. Ya da [Telegram'dan @portdev'e](https://t.me/portdev) DM at.",
    copyButton: "Sayfa URL'sini kopyala",
    copiedButton: "Kopyalandı",
    dmButton: "@portdev'e DM at",
  },
  manual: {
    metaTitle: "Manuel kurulum · setup.devnads.com",
    back: "Geri",
    eyebrow: "Manuel kurulum",
    title: "Adım adım.",
    body:
      "Ana sayfadaki tek satırla aynı sonuca varır, sadece her komutun ne yaptığını görüp istediğin adımda durabilmen için ayrıştırılmış.",
    done: "Bitti mi? ",
    doneLink: "Tek satırlı kuruluma geri dön",
  },
  codeBlock: { copy: "Kopyala", copied: "Kopyalandı" },
  os: { windows: "Windows", mac: "macOS", linux: "Linux" },
  langSwitch: { aria: "Dil" },
  themeToggle: { aria: "Temayı değiştir" },
  footer: {
    copyright: "© 2026 devnads · Monad atölyeleri için",
    workshopSetup: "Atölye kurulumu",
    monadExtension: "Monad eklentisi",
    monadDocs: "Monad dokümanları",
  },
  oneLiners: {
    windows: {
      lang: "powershell",
      code: winInstall("windows-bootstrap.ps1", SHA.windows),
      caption:
        "Adım 1, Yönetici PowerShell'de. WSL2 + Ubuntu'yu kurar, sonra yeniden başlatma ister.",
      secondary: {
        lang: "bash",
        code: shInstall("wsl-bootstrap.sh", SHA.wsl),
        caption:
          "Adım 2, yeniden başlattıktan sonra Ubuntu içinde. Toolchain'i kurar, git kimliğini sorar ve dapp'i scaffold eder.",
      },
    },
    mac: {
      lang: "bash",
      code: shInstall("mac-bootstrap.sh", SHA.mac),
      caption:
        "Terminal'de çalıştır. Foundry + Node LTS'i kurar, git kimliğini sorar ve dapp'i scaffold eder.",
    },
    linux: {
      lang: "bash",
      code: shInstall("wsl-bootstrap.sh", SHA.wsl),
      caption:
        "Terminalinde çalıştır. Toolchain'i kurar, git kimliğini sorar ve dapp'i scaffold eder.",
    },
  },
  steps: {
    windows: [
      {
        num: "01",
        title: "WSL2 + Ubuntu kur",
        body:
          "PowerShell'i Yönetici olarak aç ve bootstrap'i çalıştır. Windows Subsystem for Linux'u (Ubuntu ile birlikte) kurar ve yeniden başlatma ister.",
        code: winInstall("windows-bootstrap.ps1", SHA.windows),
        lang: "powershell",
        note: [
          "Script bitince bilgisayarını yeniden başlat. WSL ancak tam bir yeniden başlatmadan sonra kullanılabilir hale gelir, yani yeniden başlatmadan 2. adım çalışmaz.",
          "VSCode'un kurulu olduğundan emin ol. Bir sonraki adımda ihtiyacın olacak. Kurulu değilse buradan kur: [code.visualstudio.com](https://code.visualstudio.com/download).",
          "Script donanım sanallaştırmasının kapalı olduğunu söylerse BIOS/UEFI'den `VT-x` (Intel) veya `AMD-V` / `SVM` (AMD) seçeneğini etkinleştirmen gerek. [Microsoft'un rehberini](https://support.microsoft.com/en-us/windows/enable-virtualization-on-windows-11-pcs-c5578302-6e43-4b4b-a449-8ced115f58e1) veya [WSL troubleshooting dokümanını](https://learn.microsoft.com/windows/wsl/troubleshooting) izle, yeniden başlat ve script'i tekrar çalıştır.",
        ],
        screenshots: [
          {
            src: "/screenshots/win-01-powershell-admin.png",
            alt: "Yönetici olarak çalışan PowerShell, bootstrap tek satırlığı",
          },
        ],
      },
      {
        num: "02",
        title: "Geliştirme toolchain'ini kur",
        body:
          "VSCode'da [WSL eklentisini](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) kur. Sonra VSCode'u başlat, F1'e bas ve \"WSL: Connect to WSL\" seç (veya belirli bir dağıtım için \"WSL: Connect to WSL using Distro\"). Açılan pencerede alt kenardan yukarı sürükleyerek terminal aç, sonra otomatik kurulum için aşağıdaki komutu kopyala.",
        code: shInstall("wsl-bootstrap.sh", SHA.wsl),
        note:
          "Terminalin WSL/Ubuntu shell'i olduğundan emin ol, Windows PowerShell veya cmd değil. Linux kullanıcı adıyla bir `$` istemini görmelisin (örn: `sen@DESKTOP:~$`). PowerShell'de çalıştırırsan başarısız olur çünkü Windows'ta `bash` yok. Eğer öyle olursa geri dön ve önce \"WSL: Connect to WSL\" çalıştır.",
        screenshots: [
          {
            src: "/screenshots/win-02a-command-palette.png",
            alt: "VSCode Komut Paleti, 'WSL: Connect to WSL' vurgulanmış",
          },
          {
            src: "/screenshots/win-02b-drag-terminal.png",
            alt: "VSCode'un alt kenarını yukarı sürükleyerek terminali açma",
          },
        ],
      },
      {
        num: "03",
        title: "Çalıştır",
        body:
          "Alt kenardan tekrar yukarı sürükleyerek terminal aç, sonra split terminal ikonuna tıkla (veya Ctrl+Shift+5'e bas) ve iki kez böl, böylece üç tane yan yana terminal olsun. Her birinde bir komut çalıştır, sonra http://localhost:3000'i aç.",
        code: [
          { code: "yarn chain", caption: "Yerel bir Anvil zinciri başlatır, böylece dapp'inin konuşacağı bir blockchain olur." },
          { code: "yarn deploy", caption: "Kontratları derler ve yerel zincire yükler." },
          { code: "yarn start", caption: "Next.js frontend'ini http://localhost:3000'de açar." },
        ],
        screenshots: [
          {
            src: "/screenshots/win-05-three-terminals.png",
            alt: "yarn chain, yarn deploy ve yarn start çalışan üç Ubuntu terminali yan yana",
          },
        ],
      },
      {
        num: "04",
        title: "Monad Testnet'e deploy et",
        body:
          "Public bir zincire deploy etmek için ayrı bir funded cüzdana ihtiyaç var (MetaMask'tan ayrı). Setup script'i bu cüzdanı senin için oluşturur, faucet'tan fonlar ve deploy script'i onu kullanır. Yeni bir terminal panosunda çalıştır.",
        code: [
          {
            code: "yarn monad:setup",
            caption:
              "Tek seferlik. Bir `monad-deployer` keystore'u oluşturur (şifre: `monad`) ve oraya MON damlatır. Tekrar çalıştırmak güvenli.",
          },
          {
            code: "yarn deploy:monad",
            caption:
              "Deployer keystore'unu kullanarak Monad Testnet'e deploy eder. Şifre sorulmuyor — setup script'i senin için yazdı.",
          },
        ],
      },
    ],
    mac: [
      {
        num: "01",
        title: "Foundry kur",
        body: "Aynı kurulum macOS ve Linux'ta çalışır.",
        code:
          'curl -L https://foundry.paradigm.xyz | bash\nexport PATH="$HOME/.foundry/bin:$PATH"\nfoundryup',
        note:
          "Export, Foundry'yi mevcut shell'in PATH'inde tutar. Sonraki shell'ler rc dosyalarından otomatik alır.",
      },
      {
        num: "02",
        title: "Node 20+ ve Yarn'ın hazır olduğundan emin ol",
        body:
          "Node zaten kuruluysa atla. Değilse nvm ile kur (macOS ve Linux'ta aynı çalışır).",
        code:
          "curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\nsource ~/.nvm/nvm.sh\nnvm install --lts\ncorepack enable",
      },
      {
        num: "03",
        title: "git + GitHub'ı ayarla",
        body: "create-eth, scaffold etmeden önce yapılandırılmış bir Git kimliği ister.",
        code:
          'git config --global user.name  "Adın"\ngit config --global user.email "sen@ornek.com"',
      },
      {
        num: "04",
        title: "dApp'ini scaffold et",
        body:
          "Tek komut, projeyi Monad Testnet (chain 10143) önceden foundry.toml ve scaffold.config.ts'e bağlı şekilde oluşturur.",
        code: `npx create-eth@latest my-monad-dapp -e ${EXTENSION}`,
      },
      {
        num: "05",
        title: "Çalıştır",
        body:
          "./my-monad-dapp içinden üç terminal aç (split pane veya yeni sekme) ve her birinde bir komut çalıştır, sonra http://localhost:3000'i aç.",
        code: [
          { code: "yarn chain", caption: "Yerel bir Anvil zinciri başlatır, böylece dapp'inin konuşacağı bir blockchain olur." },
          { code: "yarn deploy", caption: "Kontratları derler ve yerel zincire yükler." },
          { code: "yarn start", caption: "Next.js frontend'ini http://localhost:3000'de açar." },
        ],
      },
      {
        num: "06",
        title: "Monad Testnet'e deploy et",
        body:
          "Public bir zincire deploy etmek için ayrı bir funded cüzdana ihtiyaç var (MetaMask'tan ayrı). Setup script'i bu cüzdanı senin için oluşturur, faucet'tan fonlar ve deploy script'i onu kullanır.",
        code: [
          {
            code: "yarn monad:setup",
            caption:
              "Tek seferlik. Bir `monad-deployer` keystore'u oluşturur (şifre: `monad`) ve oraya MON damlatır. Tekrar çalıştırmak güvenli.",
          },
          {
            code: "yarn deploy:monad",
            caption:
              "Deployer keystore'unu kullanarak Monad Testnet'e deploy eder. Şifre sorulmuyor — setup script'i senin için yazdı.",
          },
        ],
      },
    ],
    linux: [],
  },
};
tr.steps.linux = tr.steps.mac;
