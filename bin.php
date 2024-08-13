<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bin = $_POST['bin'];
    $recaptcha = $_POST['g-recaptcha-response'];

    // Verify reCAPTCHA
    $recaptchaSecret = '6LcVJKsaAAAAAPAJAsrfzScFkRvMol5wMP8vFxdd';
    $recaptchaResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $recaptchaSecret . "&response=" . $recaptcha);
    $recaptchaData = json_decode($recaptchaResponse, true);

    if ($recaptchaData['success']) {
        $url = "https://payment.smart-glocal.com/api/apm/card/$bin/eyJib3RJZCI6NTMxNDY1MzQ4MSwiYm90QWNjb3VudCI6IjhmMDgyY2NhZDFjNGY2OWRiYzY3OGZhNDA5OTI0ZmI2Y2RlNWNjMTAiLCJjdXN0b21lcklkIjo5NzAzMzA5NjgsImN1c3RvbWVyTG9jYWxlIjoicHQtYnIiLCJwdWJsaWNUb2tlbiI6IjQ0MTNiYmIyY2FmZjlkNmE4N2YwZTY5MGRhZDEzMmFiMDg5NDMyNGYxY2Y3OTlmMTRiYjY1MzczNTNkMDJmOWEifQ==/5ae114adb28210b6a512292dd22d77e72e2714cec7f9b2f11db8a25ea1586811";
        
        $options = [
            'http' => [
                'method' => 'GET',
                'header' => "Content-Type: application/json\r\n"
            ]
        ];
        
        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        
        if ($response !== false) {
            $data = json_decode($response, true);
            
            // Initialize keys with null values
            $cardCategory = isset($data['cardInfo']['cardCategory']) ? $data['cardInfo']['cardCategory'] : null;
            $cardBrand = isset($data['cardInfo']['cardBrand']) ? $data['cardInfo']['cardBrand'] : null;
            $bankName = isset($data['cardInfo']['bankName']) ? $data['cardInfo']['bankName'] : null;

            $result = [
                'cardInfo' => $data['cardInfo'],
                'cardCategory' => $cardCategory,
                'cardBrand' => $cardBrand,
                'bankName' => $bankName,
            ];
            
            echo json_encode($result);
        } else {
            echo json_encode(['error' => 'Failed to retrieve BIN information.']);
        }
    } else {
        echo json_encode(['error' => 'reCAPTCHA verification failed.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
?>
