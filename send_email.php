<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // جمع البيانات من النموذج
    $first_name = htmlspecialchars($_POST['first_name']);
    $second_name = htmlspecialchars($_POST['second_name']);
    $third_name = htmlspecialchars($_POST['third_name']);
    $last_name = htmlspecialchars($_POST['last_name']);
    $student_phone = htmlspecialchars($_POST['student_phone']);
    $father_phone = htmlspecialchars($_POST['father_phone']);
    $grade = htmlspecialchars($_POST['grade']);

    // إعداد البريد الإلكتروني
    $to = "plusinmath@gmail.com";
    $subject = "طلب إنشاء حساب جديد";
    $body = "طلب إنشاء حساب جديد:\n" .
            "الاسم الأول: $first_name\n" .
            "الاسم الثاني: $second_name\n" .
            "الاسم الثالث: $third_name\n" .
            "الاسم الأخير: $last_name\n" .
            "رقم هاتف الطالب: $student_phone\n" .
            "رقم هاتف الأب: $father_phone\n" .
            "الصف: $grade";
    $headers = "From: noreply@yourdomain.com\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

    // إرسال البريد
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "تم إرسال البريد بنجاح!";
    } else {
        http_response_code(500);
        echo "فشل إرسال البريد!";
    }
} else {
    http_response_code(405);
    echo "طريقة الطلب غير مسموحة!";
}
?>