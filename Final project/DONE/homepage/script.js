document.addEventListener('DOMContentLoaded', (event) => {
    // --- Get Elements ---
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup'); // Nút Login trên header
    const iconClose = document.querySelector('.icon-close'); // Nút đóng popup

    // Các phần tử để quản lý việc hiển thị Dashboard
    const dashboardContent = document.getElementById('dashboard-content');
    const homeLink = document.getElementById('home-link');
    const courtListLink = document.getElementById('courtlist-link');
    const serviceLink = document.getElementById('service-link');
    const contactLink = document.getElementById('contact-link');

    // --- Initial State ---
    // Ban đầu, dashboard-content sẽ bị ẩn bởi CSS (class .dashboard-hidden)
    dashboardContent.classList.add('dashboard-hidden');
    
    // Kiểm tra tham số URL để quyết định hiển thị login popup
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showLogin') === 'true') {
        wrapper.classList.add('active-popup');
        document.body.classList.remove('show-dashboard');
    } else {
        // Mặc định hiển thị popup Login/Register khi trang Home được tải
        wrapper.classList.add('active-popup');
        // Đảm bảo body có padding-top đúng cho trang Home (khi dashboard ẩn)
        document.body.classList.remove('show-dashboard');
    }


    // --- Login/Register Functionality ---
    registerLink.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
        wrapper.classList.remove('active');
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        // Khi mở popup login, đảm bảo dashboard content ẩn đi
        hideDashboardContent(); 
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active'); // Đảm bảo quay về trạng thái login nếu đang ở register
    });

    // --- Chức năng ẩn/hiện Dashboard Content ---

    function hideDashboardContent() {
        dashboardContent.classList.add('dashboard-hidden');
        dashboardContent.classList.remove('dashboard-visible');
        document.body.classList.remove('show-dashboard'); // Xóa class này khỏi body để padding-top trở lại
    }

    function showDashboardContent() {
        dashboardContent.classList.remove('dashboard-hidden');
        dashboardContent.classList.add('dashboard-visible');
        document.body.classList.add('show-dashboard'); // Thêm class này vào body để bỏ padding-top
        // Ẩn form Login/Register khi hiển thị dashboard
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active'); // Đảm bảo ẩn cả form register
    }

    // Event listener cho nút "Court List"
    courtListLink.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
        showDashboardContent();
    });

    // Event listeners cho các nút điều hướng khác để ẩn Dashboard và hiển thị Login/Register
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideDashboardContent();
        wrapper.classList.add('active-popup'); // Hiển thị popup Login/Register trên trang Home
        wrapper.classList.remove('active'); // Đảm bảo hiển thị form Login
    });

    serviceLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideDashboardContent();
        // Có thể thêm logic riêng cho trang Service nếu có
        // Ví dụ: hiển thị một div nội dung service khác
    });

    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideDashboardContent();
        // Có thể thêm logic riêng cho trang Contact nếu có
    });


    // --- Chức năng chọn Môn thể thao ---
    const sportSelectionItem = document.getElementById('sport-selection-item');
    const dropdownMenu = sportSelectionItem.querySelector('.dropdown-menu');
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

    // Toggle dropdown visibility for sports
    sportSelectionItem.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent document click from closing it immediately
        sportSelectionItem.classList.toggle('active');
        // Đảm bảo đóng các Flatpickr nếu đang mở
        if (flatpickrDateInstance.isOpen) flatpickrDateInstance.close();
        if (flatpickrTimeInstance.isOpen) flatpickrTimeInstance.close();
    });

    // Handle selection of a sport
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedSport = item.getAttribute('data-value');
            // Update the text of the selection item (excluding the arrow)
            sportSelectionItem.childNodes[0].nodeValue = selectedSport + ' '; // Update text node before arrow
            sportSelectionItem.classList.remove('active'); // Close the dropdown
        });
    });

    // --- Chức năng chọn Ngày đặt với Flatpickr ---
    const dateSelectionItem = document.getElementById('date-selection-item');
    const datePickerInput = document.getElementById('date-picker-input');
    const dateArrowDown = document.getElementById('date-arrow-down');
    let flatpickrDateInstance; 
    
    flatpickrDateInstance = flatpickr(datePickerInput, {
        dateFormat: "d/m/Y",
        minDate: "today",
        disableMobile: "true",
        appendTo: dateSelectionItem,
        onOpen: function(selectedDates, dateStr, instance) {
            dateSelectionItem.classList.add('active');
            if (flatpickrTimeInstance && flatpickrTimeInstance.isOpen) {
                flatpickrTimeInstance.close();
            }
            // Đảm bảo đóng dropdown môn thể thao
            sportSelectionItem.classList.remove('active');
        },
        onClose: function(selectedDates, dateStr, instance) {
            dateSelectionItem.classList.remove('active');
        },
        onChange: function(selectedDates, dateStr, instance) {
            if (dateStr) {
                dateSelectionItem.childNodes[0].nodeValue = dateStr + ' ';
            } else {
                dateSelectionItem.childNodes[0].nodeValue = 'Ngày đặt ';
            }
        }
    });

    datePickerInput.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    dateArrowDown.addEventListener('click', (event) => {
        event.stopPropagation();
        if (flatpickrDateInstance.isOpen) {
            flatpickrDateInstance.close();
        } else {
            flatpickrDateInstance.open();
        }
    });

    // --- Chức năng Giờ đặt với Flatpickr (đã có AM/PM) ---
    const timeSelectionItem = document.getElementById('time-selection-item');
    const timePickerInput = document.getElementById('time-picker-input');
    const timeArrowDown = document.getElementById('time-arrow-down');
    let flatpickrTimeInstance;

    flatpickrTimeInstance = flatpickr(timePickerInput, {
        enableTime: true,        // Cho phép chọn thời gian
        noCalendar: true,        // Không hiển thị lịch ngày
        dateFormat: "h:i K",     // Định dạng thời gian 12 giờ (h:i) với AM/PM (K)
        time_24hr: false,        // Đặt false để sử dụng định dạng 12 giờ
        minuteIncrement: 30,     // Bước nhảy cho phút là 30 phút
        appendTo: timeSelectionItem, // Gắn bộ chọn giờ vào selection-item
        onOpen: function(selectedDates, dateStr, instance) {
            timeSelectionItem.classList.add('active');
            if (flatpickrDateInstance.isOpen) {
                flatpickrDateInstance.close();
            }
            // Đảm bảo đóng dropdown môn thể thao
            sportSelectionItem.classList.remove('active');
        },
        onClose: function(selectedDates, dateStr, instance) {
            timeSelectionItem.classList.remove('active');
        },
        onChange: function(selectedDates, dateStr, instance) {
            if (dateStr) {
                timeSelectionItem.childNodes[0].nodeValue = dateStr + ' ';
            } else {
                timeSelectionItem.childNodes[0].nodeValue = 'Giờ đặt ';
            }
        }
    });

    timePickerInput.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    timeArrowDown.addEventListener('click', (event) => {
        event.stopPropagation();
        if (flatpickrTimeInstance.isOpen) {
            flatpickrTimeInstance.close();
        } else {
            flatpickrTimeInstance.open();
        }
    });

    // --- Global click listener để đóng dropdowns/calendars khi click ra ngoài ---
    document.addEventListener('click', (event) => {
        // Đóng dropdown chọn môn thể thao nếu click ra ngoài
        if (!sportSelectionItem.contains(event.target)) {
            sportSelectionItem.classList.remove('active');
        }

        // Đóng bộ chọn ngày nếu click ra ngoài khu vực chọn ngày HOẶC ngoài chính lịch ngày
        if (flatpickrDateInstance && flatpickrDateInstance.calendarContainer && !dateSelectionItem.contains(event.target) && !flatpickrDateInstance.calendarContainer.contains(event.target)) {
            if (flatpickrDateInstance.isOpen) {
                flatpickrDateInstance.close();
            }
        }

        // Đóng bộ chọn giờ nếu click ra ngoài khu vực chọn giờ HOẶC ngoài chính bộ chọn giờ
        if (flatpickrTimeInstance && flatpickrTimeInstance.calendarContainer && !timeSelectionItem.contains(event.target) && !flatpickrTimeInstance.calendarContainer.contains(event.target)) {
            if (flatpickrTimeInstance.isOpen) {
                flatpickrTimeInstance.close();
            }
        }
    });


    // --- Court Data and Dynamic Generation ---
    const courtCardsContainer = document.querySelector('.court-cards-container');

    // Sample court data (6 courts) - Đã cập nhật chi tiết loại sân (specificType)
    const courtData = [
        // Sân bóng đá
        { id: 1, name: 'Sân Bóng Đá A', location: 'Quận 1, TP.HCM', description: 'Sân cỏ nhân tạo 7 người, có đèn chiếu sáng, đạt chuẩn FIFA mini.', image: 'image/football_court_1.jpg', phone: '0901234567', price: '200.000 VNĐ/giờ', type: 'Bóng đá', specificType: 'Sân cỏ nhân tạo 7 người', owner: 'Anh Nguyễn Văn A' },
        { id: 2, name: 'Sân Bóng Đá B', location: 'Quận 7, TP.HCM', description: 'Sân cỏ tự nhiên 11 người, chất lượng cao, thường xuyên tổ chức giải đấu.', image: 'image/football_court_2.jpg', phone: '0902345678', price: '350.000 VNĐ/giờ', type: 'Bóng đá', specificType: 'Sân cỏ tự nhiên 11 người', owner: 'Chị Trần Thị B' },
        // Sân bóng chuyền
        { id: 3, name: 'Sân Bóng Chuyền 1', location: 'Quận Bình Thạnh, TP.HCM', description: 'Sân trong nhà, sàn gỗ, thoáng mát, có điều hòa.', image: 'image/volleyball_court_1.jpg', phone: '0903456789', price: '150.000 VNĐ/giờ', type: 'Bóng chuyền', specificType: 'Sân trong nhà', owner: 'Anh Lê Văn C' },
        { id: 4, name: 'Sân Bóng Chuyền 2', location: 'Quận Gò Vấp, TP.HCM', description: 'Sân ngoài trời, có mái che, phù hợp mọi thời tiết, view đẹp.', image: 'image/volleyball_court_2.jpg', phone: '0904567890', price: '120.000 VNĐ/giờ', type: 'Bóng chuyền', specificType: 'Sân ngoài trời có mái che', owner: 'Chị Phạm Thị D' },
        // Sân bóng rổ
        { id: 5, name: 'Sân Bóng Rổ X', location: 'Quận 3, TP.HCM', description: 'Sân trong nhà, đạt chuẩn thi đấu, có phòng gym đi kèm.', image: 'image/basketball_court_1.jpg', phone: '0905678901', price: '180.000 VNĐ/giờ', type: 'Bóng rổ', specificType: 'Sân trong nhà', owner: 'Anh Hoàng Văn E' },
        { id: 6, name: 'Sân Bóng Rổ Y', location: 'Quận Phú Nhuận, TP.HCM', description: 'Sân ngoài trời, có khán đài lớn, thích hợp tổ chức sự kiện.', image: 'image/basketball_court_2.jpg', phone: '0906789012', price: '100.000 VNĐ/giờ', type: 'Bóng rổ', specificType: 'Sân ngoài trời', owner: 'Chị Nguyễn Thị F' },
    ];

    // Function to create and append court cards
    function renderCourtCards() {
        courtCardsContainer.innerHTML = ''; // Clear existing cards
        courtData.forEach(court => {
            const courtCard = document.createElement('div');
            courtCard.classList.add('court-card');
            
            courtCard.innerHTML = `
                <img src="${court.image}" alt="${court.name}" class="court-image">
                <div class="court-info-wrapper">
                    <p class="court-name">${court.name}</p>
                    <div class="court-detail-item">
                        <ion-icon name="call-outline"></ion-icon>
                        <span>${court.phone}</span>
                    </div>
                    <div class="court-detail-item">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>${court.location}</span>
                    </div>
                    <button class="detail-button" data-court-id="${court.id}">Chi tiết</button>
                </div>
            `;
            courtCardsContainer.appendChild(courtCard);

            // Add click listener to the "Chi tiết" button
            const detailButton = courtCard.querySelector('.detail-button');
            detailButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click if any parent listener exists
                // Lấy ID của sân từ data attribute
                const courtId = parseInt(e.target.dataset.courtId);
                // Tìm thông tin sân trong mảng courtData
                const selectedCourt = courtData.find(c => c.id === courtId);
                if (selectedCourt) {
                    navigateToCourtDetail(selectedCourt);
                }
            });
        });
    }

    // Function to navigate to the court detail page
    function navigateToCourtDetail(court) {
        // Mã hóa đối tượng court thành chuỗi JSON và mã hóa URL
        const courtDataEncoded = encodeURIComponent(JSON.stringify(court));
        // Chuyển hướng đến trang court-detail.html và truyền dữ liệu qua URL
        window.location.href = `court-detail.html?court=${courtDataEncoded}`;
    }

    // Initial render of court cards when the page loads
    renderCourtCards();

    // Để trang Home hiển thị form Login ban đầu.
    // Dòng này sẽ được chạy sau khi check `showLogin` param.
    // Nếu không có `showLogin=true`, nó sẽ hiển thị login popup.
    if (!urlParams.get('showLogin')) {
        homeLink.click(); // Giả lập click vào Home để thiết lập trạng thái ban đầu
    }

});