document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1. DATA DINAMIS GALERI
  // ===============================
  const galleryData = [
    {
      title: "Rapat Perdana",
      category: ["rapat"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Rapat Kedua",
      category: ["rapat"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Rapat Kerja",
      category: ["rapat", "agenda"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "HIMFUN 1",
      category: ["bonding"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "MOP Himtika",
      category: ["kaderisasi"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "SERTIJAB",
      category: ["kaderisasi"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Rapat Koordinasi",
      category: ["rapat"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Himtika Growth Up 1",
      category: ["agenda"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Rapat ketiga",
      category: ["rapat"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Himtika Growth Up 1 & 2",
      category: ["agenda"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "HIMFUN 2",
      category: ["bonding"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Evaluasi Triwulan 1",
      category: ["agenda"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "HIMFUN 3",
      category: ["bonding"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Rapat keempat",
      category: ["rapat"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "Evaluasi Triwulan 2",
      category: ["agenda"],
      image: "/assets/img/logo/himtika.png",
    },
    {
      title: "HIMFUN 4",
      category: ["bonding"],
      image: "/assets/img/logo/himtika.png",
    },
  ];
  
  // ===============================
  // 2. WARNA BADGE PER KATEGORI
  // ===============================
  const categoryColors = {
    rapat: "bg-[#D5AF34]",
    agenda: "bg-blue-500",
    kaderisasi: "bg-red-500",
    bonding: "bg-green-500",
  };

  const galleryGrid = document.getElementById("gallery-grid");

  const loadMoreBtn = document.getElementById("load-more-btn");
  const itemsPerPage = 9; 
  let currentFilteredData = [...galleryData];
  let isShowingAll = false;

  // ===============================
  // 3. RENDER HTML DINAMIS
  // ===============================
  function renderGallery(data) {
    galleryGrid.innerHTML = "";

    data.forEach((item) => {
      const badgesHtml = item.category
        .map(
          (cat) => `
          <span class="inline-block ${categoryColors[cat] ?? "bg-gray-500"}
            text-gray-900 text-xs font-bold px-3 py-1 rounded-full mr-2 mb-2">
            ${cat.toUpperCase()}
          </span>`
        )
        .join("");

      galleryGrid.innerHTML += `
        <a href="#"
          class="gallery-card group relative block w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
          data-category='${JSON.stringify(item.category)}'
        >
            <img src="${item.image}"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">

            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            <div class="absolute bottom-0 left-0 p-5">
                ${badgesHtml}

                <h3 class="text-xl font-bold text-white">${item.title}</h3>
            </div>
        </a>
      `;
    });
  }

  function updateDisplay() {
    if (isShowingAll) {
      // Jika true, render semua data yang sudah difilter
      renderGallery(currentFilteredData);
      loadMoreBtn.style.display = "none"; // Sembunyikan tombol
    } else {
      // Jika false, render 9 item pertama
      renderGallery(currentFilteredData.slice(0, itemsPerPage)); // Tampilkan tombol "Load More" HANYA jika data > 9
      if (currentFilteredData.length > itemsPerPage) {
        loadMoreBtn.style.display = "block";
      } else {
        loadMoreBtn.style.display = "none";
      }
    }
  }

  // ===============================
  // 4. FILTER BUTTON HANDLING
  // ===============================
  const filterButtons = document.querySelectorAll(
    "#gallery-filters .filter-btn"
  );

  const activeClasses = [
    "golden-gradient-bg",
    "text-gray-900",
    "shadow-lg",
    "shadow-yellow-500/20",
    "border-0",
  ];

  const inactiveClasses = [
    "bg-transparent",
    "border-2",
    "border-gray-700",
    "text-gray-400",
  ];

  const hoverClasses = [
    "hover:bg-gray-800",
    "hover:text-white",
    "hover:border-gray-600",
  ];

  function setButtonActive(button) {
    filterButtons.forEach((btn) => {
      btn.classList.remove(...activeClasses);
      btn.classList.add(...inactiveClasses, ...hoverClasses);
    });

    button.classList.add(...activeClasses);
    button.classList.remove(...inactiveClasses, ...hoverClasses);
  }

  // ===============================
  // 5. LOGIKA FILTER (SUPPORT MULTI CATEGORY)
  // ===============================
  function filterGallery(filterValue) {
    // 1. Perbarui data yang difilter
    currentFilteredData =
      filterValue === "all"
        ? [...galleryData] // Buat salinan baru
        : galleryData.filter((item) => item.category.includes(filterValue)); // 2. Reset status "Load More" setiap kali filter diganti

    isShowingAll = false; // 3. Panggil fungsi update tampilan, BUKAN renderGallery

    updateDisplay();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter;
      setButtonActive(button);
      filterGallery(filterValue);
    });
  });

  loadMoreBtn.addEventListener("click", () => {
    isShowingAll = true; // Set status untuk menampilkan semua
    updateDisplay(); // Render ulang dengan semua item
  });

  updateDisplay(); 
});
