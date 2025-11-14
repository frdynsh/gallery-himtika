document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1. DATA DINAMIS GALERI
  // ===============================
  const galleryData = [
    {
      title: "Rapat Perdana",
      category: ["rapat"],
      images: [
        "/assets/img/rapat/rapat-perdana/1.jpeg",
        "/assets/img/rapat/rapat-perdana/2.jpeg",
        "/assets/img/rapat/rapat-perdana/3.jpeg",
      ],
    },
    {
      title: "Rapat Kedua",
      category: ["rapat"],
      images: [
        "/assets/img/rapat/rapat-kedua/1.jpeg",
        "/assets/img/rapat/rapat-kedua/2.jpeg",
        "/assets/img/rapat/rapat-kedua/3.jpeg",
      ],
    },
    {
      title: "Rapat Kerja",
      category: ["rapat", "agenda"],
      images: [
        "/assets/img/rapat/rapat-kerja/1.jpeg",
        "/assets/img/rapat/rapat-kerja/2.jpeg",
        "/assets/img/rapat/rapat-kerja/3.jpeg",
      ],
    },
    {
      title: "MOP Himtika",
      category: ["kaderisasi"],
      images: [
        "/assets/img/kaderisasi/mop/1.jpeg",
        "/assets/img/kaderisasi/mop/2.jpeg",
        "/assets/img/kaderisasi/mop/3.jpeg",
      ],
    },
    {
      title: "SERTIJAB",
      category: ["kaderisasi"],
      images: [
        "/assets/img/kaderisasi/sertijab/1.jpeg",
        "/assets/img/kaderisasi/sertijab/2.jpeg",
        "/assets/img/kaderisasi/sertijab/3.jpeg",
      ],
    },
    {
      title: "Himtika Growth Up 1",
      category: ["agenda"],
      images: [
        "/assets/img/agenda/hgu1/1.JPG",
        "/assets/img/agenda/hgu1/2.JPG",
        "/assets/img/agenda/hgu1/3.JPG",
      ],
    },
    {
      title: "Rapat ketiga",
      category: ["rapat"],
      images: [
        "/assets/img/rapat/rapat-ketiga/1.JPG",
        "/assets/img/rapat/rapat-ketiga/2.JPG",
        "/assets/img/rapat/rapat-ketiga/3.JPG",
      ],
    },
    {
      title: "Himtika Growth Up 2 & 3",
      category: ["agenda"],
      images: [
        "/assets/img/agenda/hgu2&3/1.JPG",
        "/assets/img/agenda/hgu2&3/2.JPG",
        "/assets/img/agenda/hgu2&3/3.JPG",
      ],
    },
    {
      title: "HIMFUN 2",
      category: ["bonding"],
      images: [
        "/assets/img/bonding/himfun2/1.JPG",
        "/assets/img/bonding/himfun2/2.JPG",
        "/assets/img/bonding/himfun2/3.JPG",
      ],
    },
    {
      title: "Evaluasi Triwulan 1",
      category: ["agenda"],
      images: [
        "/assets/img/agenda/triwulan1/1.jpeg",
        "/assets/img/agenda/triwulan1/2.jpeg",
        "/assets/img/agenda/triwulan1/3.jpeg",
      ],
    },
    {
      title: "HIMFUN 3",
      category: ["bonding"],
      images: [
        "/assets/img/bonding/himfun3/1.jpeg",
        "/assets/img/bonding/himfun3/2.jpeg",
        "/assets/img/bonding/himfun3/3.jpeg",
      ],
    },
    {
      title: "Rapat keempat",
      category: ["rapat"],
      images: [
        "/assets/img/rapat/rapat-keempat/1.jpg",
        "/assets/img/rapat/rapat-keempat/2.jpg",
        "/assets/img/rapat/rapat-keempat/3.jpg",
      ],
    },
    {
      title: "Evaluasi Triwulan 2",
      category: ["agenda"],
      images: [
        "/assets/img/agenda/triwulan2/1.jpeg",
        "/assets/img/agenda/triwulan2/2.jpeg",
        "/assets/img/agenda/triwulan2/3.jpeg",
      ],
    },
    {
      title: "HIMFUN 4",
      category: ["bonding"],
      images: [
        "/assets/img/bonding/himfun4/1.jpg",
        "/assets/img/bonding/himfun4/2.jpg",
        "/assets/img/bonding/himfun4/3.jpg",
      ],
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
            <img src="${item.images[0]}"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">

            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            <div class="absolute bottom-0 left-0 p-5">
                ${badgesHtml}

                <h3 class="text-xl font-bold text-white">${item.title}</h3>
                <p class="text-sm text-gray-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"> Lihat Album <i class="fas fa-arrow-right ml-1"></i> </p>
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

  // ======================================================
  // 6. POPUP & SLIDER GALERI
  // ======================================================

  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalBadges = document.getElementById("modal-badges");
  const closeModal = document.getElementById("close-modal");

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let currentIndex = 0;
  let currentPhotoIndex = 0;

  function openModal(index, dataSource) {
    const item = dataSource[index];
    currentPhotoIndex = 0;

    modalImage.src = item.images[currentPhotoIndex];
    modalTitle.textContent = item.title;

    modalBadges.innerHTML = item.category
      .map(
        (cat) => `
      <span class="inline-block ${categoryColors[cat] ?? "bg-gray-500"}
        text-gray-900 text-xs font-bold px-3 py-1 rounded-full mr-2 mb-2">
        ${cat.toUpperCase()}
      </span>
    `
      )
      .join("");

    // Update tombol navigasi
    prevBtn.disabled = currentPhotoIndex === 0;
    nextBtn.disabled = currentPhotoIndex === item.images.length - 1;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModalFn() {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  closeModal.addEventListener("click", closeModalFn);

  // Klik luar modal → close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFn();
  });

  // Prev Button
  prevBtn.addEventListener("click", () => {
    const item = currentFilteredData[currentIndex];
    if (currentPhotoIndex > 0) {
      currentPhotoIndex--;
      modalImage.src = item.images[currentPhotoIndex];

      prevBtn.disabled = currentPhotoIndex === 0;
      nextBtn.disabled = false;
    }
  });

  // Next Button
  nextBtn.addEventListener("click", () => {
    const item = currentFilteredData[currentIndex];
    if (currentPhotoIndex < item.images.length - 1) {
      currentPhotoIndex++;
      modalImage.src = item.images[currentPhotoIndex];

      nextBtn.disabled = currentPhotoIndex === item.images.length - 1;
      prevBtn.disabled = false;
    }
  });

  // ======================================================
  // 7. CLICK CARD → BUKA MODAL
  // ======================================================

  function activateGalleryClick() {
    const cards = document.querySelectorAll(".gallery-card");

    cards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();

        // Index item sesuai data filter saat ini
        currentIndex = index;

        openModal(currentIndex, currentFilteredData);
      });
    });
  }

  // Render ulang → aktifkan ulang click handler
  const originalRenderGallery = renderGallery;
  renderGallery = function (data) {
    originalRenderGallery(data);
    activateGalleryClick(); // aktifkan click setiap render baru
  };

  // Jalankan pertama kali
  activateGalleryClick();
});
