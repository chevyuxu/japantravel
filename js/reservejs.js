const circles = document.querySelectorAll('.circle');
const confirmButton = document.querySelector('.confirm-button');
const resultDiv = document.querySelector('.result');
const startDateInput = document.querySelector('.start-date');
const endDateInput = document.querySelector('.end-date');

let selectedImage = null;

circles.forEach(circle => {
  circle.addEventListener('click', () => {
    circles.forEach(c => c.classList.remove('selected'));
    circle.classList.add('selected');
    selectedImage = circle.querySelector('img').getAttribute('src');
  });
});

startDateInput.addEventListener("change", function() {
  endDateInput.min = this.value;
});

endDateInput.addEventListener("change", function() {
  if (this.value < startDateInput.value) {
    this.value = startDateInput.value;
  }
});

// 定義圖片和標題數組
const images = [
  './images/北海道雪景.jpg',
  './images/日本壽司.jpg',
  './images/富士山.jpg',
  './images/清水寺.jpg'
];

const titles = [
  ['雪地探險', '雪花觀賞', '當地藝術','攝影導覽'],
  ['日本壽司', '海鮮', '和菓子'],
  ['富士山', '登山', '富士急樂園','河口湖溫泉'],
  ['清水寺', '和服體驗', '千手觀音']
];

confirmButton.addEventListener('click', function() {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  if (selectedImage && startDate && endDate) {
    // 生成隨機數量的卡片（3到10張）
    const numCards = Math.floor(Math.random() * 8) + 3;
    let resultContent = '';

    for (let i = 0; i < numCards; i++) {
      // 生成隨機的兩天日期
      const randomDate1 = getRandomDate(startDate, endDate);
      const randomDate2 = getRandomDate(startDate, endDate);

      // 比較日期，確保前一個日期在前面
      const earlierDate = randomDate1 < randomDate2 ? randomDate1 : randomDate2;
      const laterDate = randomDate1 < randomDate2 ? randomDate2 : randomDate1;

      // 根據選擇的圖片索引取得對應的標題數組
      const titleArray = titles[images.indexOf(selectedImage)];

      // 從標題數組中隨機選擇一個標題
      const randomTitle = titleArray[Math.floor(Math.random() * titleArray.length)];

      // 生成卡片的HTML代碼
      const cardHTML = `
        <div class="card">
          <img src="${selectedImage}" alt="圖片">
          <div class="card-content">
            <h3>${randomTitle}</h3>
            <p>日期：${earlierDate.toLocaleDateString()} 至 ${laterDate.toLocaleDateString()}</p>
          </div>
        </div>
      `;

      resultContent += cardHTML;
    }

    // 將結果的內容設置為生成的內容
    resultDiv.innerHTML = resultContent;

    // 顯示結果
    resultDiv.style.display = 'block';
  } else {
    // 如果未選擇圖片或日期，隱藏結果
    resultDiv.style.display = 'none';
  }
});

// 生成指定日期範圍內的隨機日期
function getRandomDate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return randomDate;
}

// 回頂部
const scrollToTopButton = document.getElementById('scrollToTopButton');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
});

scrollToTopButton.addEventListener('click', () => {
  scrollToTop(0, 500);
});

function scrollToTop(scrollTarget, duration) {
  const scrollStep = -window.scrollY / (duration / 15);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== scrollTarget) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

// 測試
// Create a new Intersection Observer instance
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
});

// Observe each card element
const card = document.createElement('div');
card.classList.add('card', 'fade-in');
card.innerHTML = cardHTML;
resultDiv.appendChild(card);
cards.forEach(card => {
  observer.observe(card);
});