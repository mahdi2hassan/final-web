<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // تأكد من تثبيت PHPMailer عبر Composer

header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // جمع البيانات من النموذج
    $first_name = isset($_POST['first_name']) ? htmlspecialchars($_POST['first_name']) : '';
    $second_name = isset($_POST['second_name']) ? htmlspecialchars($_POST['second_name']) : '';
    $third_name = isset($_POST['third_name']) ? htmlspecialchars($_POST['third_name']) : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars($_POST['last_name']) : '';
    $student_phone = isset($_POST['student_phone']) ? htmlspecialchars($_POST['student_phone']) : '';
    $father_phone = isset($_POST['father_phone']) ? htmlspecialchars($_POST['father_phone']) : '';
    $grade = isset($_POST['grade']) ? htmlspecialchars($_POST['grade']) : '';

    // التحقق من أن جميع الحقول مملوءة
    if (empty($first_name) || empty($second_name) || empty($third_name) || empty($last_name) ||
        empty($student_phone) || empty($father_phone) || empty($grade)) {
        http_response_code(400);
        echo "يرجى ملء جميع الحقول المطلوبة!";
        exit;
    }

    // التحقق من أن أرقام الهواتف تحتوي على أرقام فقط
    if (!preg_match('/^\d+$/', $student_phone) || !preg_match('/^\d+$/', $father_phone)) {
        http_response_code(400);
        echo "يرجى إدخال أرقام هاتف صالحة (أرقام فقط)!";
        exit;
    }

    // إعداد البريد الإلكتروني
    $mail = new PHPMailer(true);
    try {
        // إعدادات SMTP (مثال باستخدام Gmail)
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // بريدك الإلكتروني
        $mail->Password = 'your-app-password'; // كلمة مرور التطبيق (ليس كلمة مرور البريد)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // إعداد البريد
        $mail->setFrom('your-email@gmail.com', 'Plus Signup');
        $mail->addAddress('plusinmath@gmail.com');
        $mail->Subject = 'طلب إنشاء حساب جديد';
        $mail->CharSet = 'UTF-8';
        $mail->Body = "طلب إنشاء حساب جديد:\n" .
                      "الاسم الأول: $first_name\n" .
                      "الاسم الثاني: $second_name\n" .
                      "الاسم الثالث: $third_name\n" .
                      "الاسم الأخير: $last_name\n" .
                      "رقم هاتف الطالب: $student_phone\n" .
                      "رقم هاتف الأب: $father_phone\n" .
                      "الصف: $grade";

        // إرسال البريد
        $mail->send();
        http_response_code(200);
        echo "تم إرسال البريد بنجاح!";
    } catch (Exception $e) {
        http_response_code(500);
        echo "فشل إرسال البريد! الخطأ: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(405);
    echo "طريقة الطلب غير مسموحة!";
}
?>