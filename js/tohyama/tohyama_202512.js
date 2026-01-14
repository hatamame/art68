// -----------------------------------------------------------------
//  リンク生成
// -----------------------------------------------------------------
const create_mynum = function () {
  const mynum = Math.floor(Math.random() * 10) + 1;
  let mylink = "";

  if (mynum % 2 === 1) {
    mylink = "250789";
  } else {
    mylink = "274169";
  }
  return mylink;
};

// -----------------------------------------------------------------
//  ヘッダー生成
// -----------------------------------------------------------------
const CommonHeader = document.createElement("header");
CommonHeader.className = "header";

CommonHeader.innerHTML =
  '<div class="container">' +
  '<a href="https://gamboo.jp/" class="lab-logo-text">' +
  '<img src="/images/tohyama/tohyama_index_2024/gamboo_logo.png" alt="Gamboo" class="gamboo_logo">' +
  "</a>" +
  '<div class="hamburger" id="ignite">' +
  '<span class="hamburger-bar"></span>' +
  '<span class="hamburger-bar"></span>' +
  '<span class="hamburger-bar"></span>' +
  "</div>" +
  "</div>";

// ヘッダーをbodyの最初に挿入
document.body.insertBefore(CommonHeader, document.body.firstChild);

// メニュー生成
const menu_list = document.createElement("section");
menu_list.className = "menu_off";

const mylink = create_mynum();

menu_list.innerHTML = `
  <div>
      <p><a href="https://gamboo.jp/">Gambooトップ</a></p>
      <p><a href="https://gamboo.jp/pages/?tid=tohyama_index_2024">研究所トップ</a></p>
      <p><a href="https://gamboo.jp/keirin/topics/?tid=tohyama-pc">競輪分析記事</a></p>
      <p><a href="https://gamboo.jp/column/view/list?mid=196801">Gambooブログ</a></p>
      <p><a href="https://gamboo.jp/pages/?tid=tohyama_bank_LP">競輪場データ集</a></p>
      <p><a href="https://gamboo.jp/web-yoso/keirin/profile/?mid=${mylink}">有料予想情報</a></p>
  </div>`;

document.body.appendChild(menu_list);

// -----------------------------------------------------------------
//  イベントリスナー&アニメーション
// -----------------------------------------------------------------
const ignite = document.getElementById("ignite");

const menu = menu_list;

ignite.addEventListener(
  "click",
  () => {
    ignite.classList.toggle("active");
    if (menu.classList.contains("menu_off")) {
      menu.classList.remove("menu_off");
      menu.classList.add("menu_on");
    } else {
      menu.classList.remove("menu_on");
      menu.classList.add("menu_off");
    }
  },
  false
);

document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------------------------------------------
  //  1. スクロールアニメーション
  // -----------------------------------------------------------------
  const sections = document.querySelectorAll(".main_section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // -----------------------------------------------------------------
  //  2. マーカーアニメーション
  // -----------------------------------------------------------------
  const markers = document.querySelectorAll(".markerY");
  const markerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px", // Trigger slightly before bottom
      threshold: 0.5,
    }
  );

  markers.forEach((marker) => {
    markerObserver.observe(marker);
  });

  // -----------------------------------------------------------------
  //  3. テーブル目次生成
  // -----------------------------------------------------------------
  const tocContainer = document.getElementById("toc-container");
  if (tocContainer) {
    const headings = document.querySelectorAll(
      "article#bdy h3, article#bdy h4"
    );
    if (headings.length > 0) {
      const tocList = document.createElement("ul");
      let currentH3Li = null;
      let currentH4Ul = null;

      headings.forEach((heading, index) => {
        // Assign ID if not present
        if (!heading.id) {
          heading.id = "heading-" + index;
        }

        const link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent;

        // Smooth scroll
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetElement = document.getElementById(heading.id);

          // ヘッダーの高さを取得（動的に生成されている.headerクラスを取得）
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;

          // 余白（ヘッダーぴったりだと窮屈な場合に調整。例: 20px）
          const buffer = 20;

          // 現在のスクロール位置 + 要素のウィンドウ相対位置 - ヘッダーの高さ - 余白
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerHeight - buffer;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });

        const li = document.createElement("li");
        li.appendChild(link);

        if (heading.tagName.toLowerCase() === "h3") {
          currentH3Li = li;
          currentH4Ul = null; // Reset H4 list
          tocList.appendChild(li);
        } else if (heading.tagName.toLowerCase() === "h4") {
          if (currentH3Li) {
            if (!currentH4Ul) {
              currentH4Ul = document.createElement("ul");
              currentH3Li.appendChild(currentH4Ul);
            }
            currentH4Ul.appendChild(li);
          } else {
            // Fallback if H4 comes before any H3 (unlikely but safe)
            tocList.appendChild(li);
          }
        }
      });

      const tocTitle = document.createElement("p");
      tocTitle.textContent = "目次";
      tocTitle.style.fontWeight = "bold";
      tocTitle.style.marginBottom = "10px";
      tocTitle.style.borderBottom = "1px solid #ccc";

      tocContainer.appendChild(tocTitle);
      tocContainer.appendChild(tocList);
    }
  }

  // -----------------------------------------------------------------
  //  4. 最初に戻るボタン
  // -----------------------------------------------------------------
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
