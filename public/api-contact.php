<?php
/**
 * Vesta Technologies Pvt. Ltd - Hostinger PHP Compatibility Bridge
 * Handles Mail Delivery natively using PHP's standard Mail Transfer Protocol on Apache environments.
 */

// Configure headers for Secure CORS and JSON inputs
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Gracefully exit configuration preflights
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not permitted. Only POST queries are supported."]);
    exit();
}

// Intercept raw parse stream
$rawPayload = file_get_contents("php://input");
$parsedData = json_decode($rawPayload, true);

if (!$parsedData) {
    http_response_code(400);
    echo json_encode(["error" => "Failed to process form input stream. No valid JSON data detected."]);
    exit();
}

$name = isset($parsedData['name']) ? trim($parsedData['name']) : '';
$email = isset($parsedData['email']) ? trim($parsedData['email']) : '';
$organization = isset($parsedData['organization']) ? trim($parsedData['organization']) : '';
$message = isset($parsedData['message']) ? trim($parsedData['message']) : '';
$category = isset($parsedData['category']) ? trim($parsedData['category']) : 'General Inquiry';

// Guarantee validation constraints are strict
if (empty($name) || empty($email) || empty($organization) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "All form fields are mandatory. Please fill in all details."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Please enter a valid email address (e.g., mail@domain.com)."]);
    exit();
}

// Recipient Dispatch destinations
$companyRecipients = "pathangulam203@gmail.com, edhas6514@gmail.com";
$subjectLine = "[Vesta OS Inquiry] New " . $category . " from " . $name;

// Compile mail properties
$mailHeaders = "MIME-Version: 1.0" . "\r\n";
$mailHeaders .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$serverDomain = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'vestaos.com';
$mailHeaders .= "From: Vesta Technologies Portal <noreply@" . $serverDomain . ">" . "\r\n";
$mailHeaders .= "Reply-To: " . $email . "\r\n";
$mailHeaders .= "X-Mailer: PHP/" . phpversion();

// Build formatted output
$htmlMessage = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F5;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 30px auto; padding: 25px; border: 1px solid #EBE9E2; border-radius: 12px; background-color: #FCFAF7; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
        <h2 style="color: #0F8B8D; margin-top: 0; border-bottom: 2px solid #D4A64A; padding-bottom: 12px; font-weight: 600;">New Form Dispatch Received</h2>
        <p style="font-size: 14px; color: #18181B; line-height: 1.6;">A visitor has submitted a new inquiry via the Vesta Technologies website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
            <tr style="background-color: #FFFFFF;">
                <td style="padding: 12px 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2; width: 140px; font-size: 13px; color: #52525B;">Category</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #EBE9E2; color: #D4A64A; font-weight: bold; font-size: 13px;">' . htmlspecialchars($category) . '</td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2; font-size: 13px; color: #52525B;">Full Name</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #EBE9E2; font-size: 13px; color: #18181B;">' . htmlspecialchars($name) . '</td>
            </tr>
            <tr style="background-color: #FFFFFF;">
                <td style="padding: 12px 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2; font-size: 13px; color: #52525B;">Email Address</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #EBE9E2; font-size: 13px;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #0F8B8D; text-decoration: none; font-weight: 500;">' . htmlspecialchars($email) . '</a></td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2; font-size: 13px; color: #52525B;">Organization</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #EBE9E2; font-size: 13px; color: #18181B;">' . htmlspecialchars($organization) . '</td>
            </tr>
        </table>

        <div style="background-color: #FFFFFF; padding: 20px; border-radius: 8px; border: 1px solid #EBE9E2; margin-top: 25px;">
            <h4 style="margin: 0 0 10px 0; color: #52525B; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Message Details</h4>
            <p style="margin: 0; font-size: 14px; color: #27272A; line-height: 1.6; white-space: pre-wrap;">' . nl2br(htmlspecialchars($message)) . '</p>
        </div>

        <p style="font-size: 11px; color: #71717A; margin-top: 35px; text-align: center; border-top: 1px solid #EBE9E2; padding-top: 15px; font-family: monospace;">
            &copy; ' . date("Y") . ' Vesta Technologies Pvt. Ltd. All rights reserved.
        </p>
    </div>
</body>
</html>
';

// Run Native Send
if (mail($companyRecipients, $subjectLine, $htmlMessage, $mailHeaders)) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Inquiry successfully sent. Thank you!"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "error" => "Mail dispatch failed. PHP core mail features are disabled or unconfigured on this host."
    ]);
}
?>
