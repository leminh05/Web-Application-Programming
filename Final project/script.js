// // document.addEventListener('DOMContentLoaded', function() {

// //     // --- LOGIC CHO MODAL "THÊM SÂN" (Giữ nguyên) ---
// //     const addFieldBtn = document.querySelector('.add-field-btn');
// //     const addModal = document.getElementById('add-field-modal');
// //     const closeAddModalBtn = document.getElementById('close-modal-btn');
// //     const openAddModal = () => { if (addModal) addModal.classList.remove('hidden'); };
// //     const closeAddModal = () => { if (addModal) addModal.classList.add('hidden'); };
// //     if (addFieldBtn) addFieldBtn.addEventListener('click', openAddModal);
// //     if (closeAddModalBtn) closeAddModalBtn.addEventListener('click', closeAddModal);
// //     if (addModal) addModal.addEventListener('click', e => { if (e.target === addModal) closeAddModal(); });

//     // --- LOGIC CHO POP-UP THÔNG BÁO (Giữ nguyên) ---
//     const notificationBell = document.getElementById('notification-bell');
//     const notificationPopup = document.getElementById('notification-popup');
//     if (notificationBell && notificationPopup) {
//         notificationBell.addEventListener('click', event => {
//             event.stopPropagation();
//             notificationPopup.classList.toggle('hidden');
//         });
//     }
//     document.addEventListener('click', event => {
//         if (notificationPopup && !notificationPopup.classList.contains('hidden') && !notificationBell.contains(event.target)) {
//             notificationPopup.classList.add('hidden');
//         }
//     });

// //     // --- LOGIC CẬP NHẬT CHO MODAL "XEM CHI TIẾT SÂN" ---
// //     const detailModal = document.getElementById('field-detail-modal');
// //     const closeDetailModalBtn = document.getElementById('close-detail-modal-btn');
// //     const modalImage = document.getElementById('modal-detail-image');
// //     const modalName = document.getElementById('modal-detail-name');
// //     const modalDescription = document.getElementById('modal-detail-description');
// //     const modalBookings = document.getElementById('modal-detail-bookings');
// //     const modalPrice = document.getElementById('modal-detail-price');
// //     const modalScheduleList = document.getElementById('modal-detail-schedule-list');
    
// //     const closeDetailModal = () => { if (detailModal) detailModal.classList.add('hidden'); };
    
// //     const detailButtons = document.querySelectorAll('.detail-button');
// //     detailButtons.forEach(button => {
// //         button.addEventListener('click', function(e) {
// //             e.preventDefault();
// //             const card = this.closest('.field-card');
            
// //             // Lấy tất cả dữ liệu từ data-attributes
// //             const name = card.dataset.name;
// //             const imgSrc = card.dataset.imgSrc;
// //             const description = card.dataset.description;
// //             const price = card.dataset.price;
// //             const bookings = card.dataset.bookings;
// //             const scheduleData = JSON.parse(card.dataset.schedule || '[]');

// //             // Cập nhật nội dung cho modal
// //             if(modalImage) modalImage.src = imgSrc;
// //             if(modalName) modalName.textContent = name;
// //             if(modalDescription) modalDescription.textContent = description;
// //             if(modalPrice) modalPrice.textContent = `${price} VND`;
// //             if(modalBookings) modalBookings.textContent = bookings;

// //             // Xử lý và hiển thị lịch trình
// //             if (modalScheduleList) {
// //                 modalScheduleList.innerHTML = ''; // Xóa lịch cũ
// //                 if (scheduleData.length > 0) {
// //                     scheduleData.forEach(slot => {
// //                         const listItem = document.createElement('li');
// //                         listItem.textContent = slot.time;
// //                         listItem.classList.add(slot.status); // Thêm class 'available' hoặc 'booked'
// //                         modalScheduleList.appendChild(listItem);
// //                     });
// //                 } else {
// //                     const listItem = document.createElement('li');
// //                     listItem.textContent = 'Chưa có thông tin lịch trình.';
// //                     modalScheduleList.appendChild(listItem);
// //                 }
// //             }

// //             // Hiển thị modal
// //             if (detailModal) detailModal.classList.remove('hidden');
// //         });
// //     });

// //     if (closeDetailModalBtn) closeDetailModalBtn.addEventListener('click', closeDetailModal);
// //     if (detailModal) detailModal.addEventListener('click', e => { if (e.target === detailModal) closeDetailModal(); });

// //     // Đóng tất cả khi nhấn phím Escape
// //     document.addEventListener('keydown', e => {
// //         if (e.key === 'Escape') {
// //             closeAddModal();
// //             closeDetailModal();
// //             if (notificationPopup) notificationPopup.classList.add('hidden');
// //         }
// //     });
// // });

document.addEventListener('DOMContentLoaded', function() {

    // --- BIẾN TOÀN CỤC ---
    let currentCard = null; // Biến để lưu trữ thẻ sân đang được xem/sửa

    // --- LẤY TẤT CẢ CÁC PHẦN TỬ DOM CẦN THIẾT ---
    
    // Modal "Thêm sân"
    const addFieldBtn = document.querySelector('.add-field-btn');
    const addModal = document.getElementById('add-field-modal');
    const closeAddModalBtn = document.getElementById('close-modal-btn');

    // Pop-up "Thông báo"
    const notificationBell = document.getElementById('notification-bell');
    const notificationPopup = document.getElementById('notification-popup');

    // Modal "Xem chi tiết"
    const detailModal = document.getElementById('field-detail-modal');
    const closeDetailModalBtn = document.getElementById('close-detail-modal-btn');
    const modalImage = document.getElementById('modal-detail-image');
    const modalName = document.getElementById('modal-detail-name');
    const modalDescription = document.getElementById('modal-detail-description');
    const modalBookings = document.getElementById('modal-detail-bookings');
    const modalPrice = document.getElementById('modal-detail-price');
    const modalScheduleList = document.getElementById('modal-detail-schedule-list');
    const editFieldBtn = document.getElementById('edit-field-btn');

    // Modal "Chỉnh sửa"
    const editModal = document.getElementById('edit-field-modal');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const editForm = document.getElementById('edit-field-form');
    const editImagePreview = document.getElementById('edit-image-preview');

    // --- HÀM MỞ/ĐÓNG MODAL CHUNG ---
    const openModal = (modal) => { if(modal) modal.classList.remove('hidden'); };
    const closeModal = (modal) => { if(modal) modal.classList.add('hidden'); };

    // --- LOGIC CHO MODAL "THÊM SÂN" ---
    if (addFieldBtn) {
        addFieldBtn.addEventListener('click', () => openModal(addModal));
    }
    if (closeAddModalBtn) {
        closeAddModalBtn.addEventListener('click', () => closeModal(addModal));
    }

    // --- LOGIC CHO POP-UP "THÔNG BÁO" ---
    if (notificationBell && notificationPopup) {
        notificationBell.addEventListener('click', (event) => {
            event.stopPropagation();
            notificationPopup.classList.toggle('hidden');
        });
    }

    // --- LOGIC CHO MODAL "XEM CHI TIẾT SÂN" ---
    const detailButtons = document.querySelectorAll('.detail-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentCard = this.closest('.field-card'); // Lưu thẻ sân đang được chọn
            
            const name = currentCard.dataset.name;
            const imgSrc = currentCard.dataset.imgSrc;
            const description = currentCard.dataset.description;
            const price = Number(currentCard.dataset.price);
            const bookings = currentCard.dataset.bookings;
            const scheduleData = JSON.parse(currentCard.dataset.schedule || '[]');

            if(modalImage) modalImage.src = imgSrc;
            if(modalName) modalName.textContent = name;
            if(modalDescription) modalDescription.textContent = description;
            if(modalPrice) modalPrice.textContent = `${price.toLocaleString('vi-VN')} VND`;
            if(modalBookings) modalBookings.textContent = bookings;

            if (modalScheduleList) {
                modalScheduleList.innerHTML = '';
                if (scheduleData.length > 0) {
                    scheduleData.forEach(slot => {
                        const li = document.createElement('li');
                        li.textContent = slot.time;
                        li.className = slot.status;
                        modalScheduleList.appendChild(li);
                    });
                } else {
                    const li = document.createElement('li');
                    li.textContent = "Chưa có dữ liệu lịch trình.";
                    modalScheduleList.appendChild(li);
                }
            }
            openModal(detailModal);
        });
    });
    if(closeDetailModalBtn) {
        closeDetailModalBtn.addEventListener('click', () => closeModal(detailModal));
    }

    // --- LOGIC CHO MODAL "CHỈNH SỬA SÂN" ---
    if(editFieldBtn) {
        editFieldBtn.addEventListener('click', () => {
            if (!currentCard) return;

            // Điền thông tin từ thẻ đang chọn vào form sửa
            editForm.elements.fieldName.value = currentCard.dataset.name;
            editForm.elements.fieldPrice.value = currentCard.dataset.price;
            editForm.elements.fieldDescription.value = currentCard.dataset.description;
            if(editImagePreview) editImagePreview.src = currentCard.dataset.imgSrc;

            closeModal(detailModal); // Đóng modal chi tiết
            openModal(editModal);    // Mở modal sửa
        });
    }
    if(closeEditModalBtn) {
        closeEditModalBtn.addEventListener('click', () => closeModal(editModal));
    }
    if(cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => closeModal(editModal));
    }

    // --- CÁC SỰ KIỆN TOÀN CỤC (ĐÓNG POP-UP/MODAL) ---
    document.addEventListener('click', (e) => {
        // Đóng pop-up thông báo khi click ra ngoài
        if (notificationPopup && !notificationPopup.classList.contains('hidden') && !notificationBell.contains(e.target)) {
            notificationPopup.classList.add('hidden');
        }
        
        // Đóng các modal khi click ra lớp phủ bên ngoài
        if(e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });

    document.addEventListener('keydown', (e) => {
        // Đóng tất cả khi nhấn phím Escape
        if(e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => closeModal(modal));
            if (notificationPopup) notificationPopup.classList.add('hidden');
        }
    });
});