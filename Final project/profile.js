document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn hành vi mặc định của thẻ a

            // Bỏ active ở tất cả các link
            sidebarLinks.forEach(item => item.classList.remove('active'));
            // Thêm active cho link vừa bấm
            this.classList.add('active');

            const targetId = this.getAttribute('data-target');
            
            // Ẩn tất cả các section
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Hiện section tương ứng
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
});