# BARG

Đồ án lập trình hiện đại

# Apps
1. App điện thoại viên
- Chức năng ghi nhận thông tin của khách hàng đặt xe, sau đó gửi lên server
2. App định vị vị trí của khách hàng
- Chức năng chính là chỉnh sửa vị trí của khách hàng (chuyển đổi từ địa chỉ sang kinh tuyến và vĩ tuyến để hiện thị trên map)
- Hiển thị 10 tài xế gần nhất để cho nhân viên chọn.
3. App quản lý chuyến đi
- Xem trạng thái của chuyến đi, nếu chuyến đi đã có tài xế thì xem vị trí hiện tại của tài xế.
4. App tài xế
- Khi có khách hàng thì được thông báo tới, tài xế được quyết định trong 10 giây, nếu đồng ý thì hiển thị đường đi ngắn nhất từ tài xế tới khách hàng, ngược lại không đồng ý hoặc không chọn thì thông báo sẽ gửi cho tài xế khác.
5. Server
- Chuyền và nhận thông tin từ các app khác và quản lý database từ firebase.
- Trường hợp nhân viên ở app Định vị vị trí chọn tài xế đầu tiên cho khách hàng mà không thành công (như tài xế không đồng ý) thì server lần lượt gửi thông báo cho 9 tài xế còn lại, nếu không tài xế nào đồng ý thì trạng thái chuyến đi được chuyển về không tìm được tài xế
# Hình ảnh
## Hình ảnh app định vị
![list image folow month-year](https://drive.google.com/uc?id=1mMJjGc7UkZotg_21Z-9Y1tOQ5Amh45XG)