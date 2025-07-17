document.addEventListener('DOMContentLoaded', () => {
    // === DOM Element Selections ===
    const btnProfilePopup = document.querySelector('.btnProfile-popup');
    const profilePageWrapper = document.getElementById('profilePageWrapper');
    const courtListPageWrapper = document.getElementById('courtListPageWrapper');
    const navLinks = document.querySelectorAll('.navigation .nav-link');

    // NEW: Reference to the court detail page wrapper
    const courtDetailPageWrapper = document.getElementById('courtDetailPageWrapper');

    // Profile page specific elements
    // Vẫn cần để các chức năng của trang Profile hoạt động bình thường
    const profileSidebarItems = profilePageWrapper.querySelectorAll('.sidebar-item');
    const profileContentSections = profilePageWrapper.querySelectorAll('.content-section');
    const profileOverviewCards = profilePageWrapper.querySelectorAll('.content-area > .card:not(.content-section .card)');

 
    const courtListSidebarItems = courtListPageWrapper.querySelectorAll('.sidebar-item');
    const courtListContentSections = courtListPageWrapper.querySelectorAll('.content-section');
    const courtListContainers = document.querySelectorAll('.court-list-display'); 

    // NEW: Elements inside the court detail page
    const detailCourtImage = document.getElementById('detail-court-image');
    const detailCourtName = document.getElementById('detail-court-name');
    const detailCourtType = document.getElementById('detail-court-type');
    const detailCourtDescription = document.getElementById('detail-court-description');
    const detailCourtAddress = document.getElementById('detail-court-address');
    const detailCourtOwner = document.getElementById('detail-court-owner');
    const detailCourtPrice = document.getElementById('detail-court-price');
    const backToCourtListBtn = document.getElementById('backToCourtListBtn'); // Nút quay lại trang danh sách

    // === Helper Functions ===
    // Function to hide all main content wrappers
    const hideAllMainWrappers = () => {
        profilePageWrapper.classList.add('hidden');
        courtListPageWrapper.classList.add('hidden');
        if (courtDetailPageWrapper) { 
            courtDetailPageWrapper.classList.add('hidden');
        }
    };

    // Function to display court details and populate the data
    const showCourtDetails = (courtData) => {
        hideAllMainWrappers(); 
        if (courtDetailPageWrapper) {
            courtDetailPageWrapper.classList.remove('hidden'); 
        }

        // Populate elements on the detail page
        detailCourtImage.src = courtData.image;
        detailCourtImage.alt = `Hình ảnh sân ${courtData.name}`; 
        detailCourtName.textContent = courtData.name;
        detailCourtType.textContent = courtData.type;
        detailCourtDescription.textContent = courtData.description;
        detailCourtAddress.textContent = courtData.address;
        detailCourtOwner.textContent = courtData.owner;
        detailCourtPrice.textContent = courtData.price;
    };

    // --- START: CODE ĐỂ XÓA NỘI DUNG VÀ CHỨC NĂNG CỦA TRANG DANH SÁCH SÂN NGAY KHI TẢI TRANG ---
    // Đảm bảo các phần tử này được tìm thấy trong courtListPageWrapper trước khi xóa
    if (courtListPageWrapper) {
        const courtListSidebar = courtListPageWrapper.querySelector('.sidebar');
        if (courtListSidebar) {
            courtListSidebar.remove();
        }

        const courtFilterSection = courtListPageWrapper.querySelector('.court-filter-section');
        if (courtFilterSection) {
            courtFilterSection.remove();
        }

        const courtListDisplay = courtListPageWrapper.querySelector('.court-list-display');
        if (courtListDisplay) {
            courtListDisplay.remove();
        }
    }
    // --- END: CODE ĐỂ XÓA NỘI DUNG VÀ CHỨC NĂNG CỦA TRANG DANH SÁCH SÂN NGAY KHI TẢI TRANG ---


    // === Event Listeners ===

    // Handle Profile button click
    btnProfilePopup.addEventListener('click', () => {
        if (profilePageWrapper.classList.contains('hidden')) {
            hideAllMainWrappers();
            profilePageWrapper.classList.remove('hidden');

            profileSidebarItems.forEach(si => si.classList.remove('active'));
            const accountSidebarItem = profilePageWrapper.querySelector('.sidebar-item[data-content="account"]');
            if (accountSidebarItem) {
                accountSidebarItem.classList.add('active');
            }
            profileContentSections.forEach(cs => cs.style.display = 'none');
            profileOverviewCards.forEach(card => card.style.display = 'block');
            document.querySelectorAll('.filter-panel').forEach(panel => panel.classList.add('hidden'));
        } else {
            profilePageWrapper.classList.add('hidden');
        }
    });

    // Handle navigation links (Home, Court List)
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = link.dataset.targetPage;

            hideAllMainWrappers();

            if (targetPage === 'home') {
                // Logic for Home page, if any
            } else if (targetPage === 'court-list') {
                courtListPageWrapper.classList.remove('hidden');
                // Trang Court List sẽ hiển thị trống rỗng do nội dung đã bị xóa ngay khi tải trang.
            }
        });
    });

    // Handle clicks on sidebar items in Profile page
    // Vẫn cần để các chức năng của trang Profile hoạt động bình thường
    profileSidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            profileSidebarItems.forEach(si => si.classList.remove('active'));
            item.classList.add('active');

            profileContentSections.forEach(cs => cs.style.display = 'none');
            profileOverviewCards.forEach(card => card.style.display = 'none');

            const targetContentId = item.dataset.content + '-content';
            const targetContent = document.getElementById(targetContentId);

            if (item.dataset.content === 'account') {
                profileOverviewCards.forEach(card => card.style.display = 'block');
            } else if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });


    // NEW: Handle click on "Quay lại" button on the detail page
    if (backToCourtListBtn) {
        backToCourtListBtn.addEventListener('click', () => {
            hideAllMainWrappers();
            courtListPageWrapper.classList.remove('hidden'); // Go back to the court list page
            // Trang Court List sẽ hiển thị trống rỗng.
        });
    }

    // === Initial Load State ===
    // Đảm bảo tất cả các wrapper chính được ẩn khi tải trang lần đầu
    hideAllMainWrappers();

    courtListPageWrapper.classList.remove('hidden'); 
});