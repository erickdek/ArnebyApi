export default function template(url){
    return `
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;border-radius: 20px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px;font-family: Arial;min-height: 400px;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;border-collapse: collapse;">
                        <!-- Logo -->
                        <tr>
                            <td align="center" style="padding-bottom: 40px;">
                                <img src="https://src.arneby.com/web/arnebylogo.png" alt="Logo" width="150" style="display: block;">
                            </td>
                        </tr>
                        <!-- Title -->
                        <tr>
                            <td align="center" style="padding-bottom: 10px;">
                                <h1 style="margin: 0; padding: 0; font-size: 24px; color: #000000;">Recuperar Contraseña</h1>
                            </td>
                        </tr>
                        <!-- Description -->
                        <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <p style="margin: 0; padding: 10px; font-size: 16px; line-height: 22px; color: #666666;">Hemos recibido una solicitud para recuperar la contraseña de tu cuenta. Si tú no solicitaste esto, puedes ignorar este correo electrónico.</p>
                                <p style="margin: 0; padding: 10px; font-size: 16px; line-height: 22px; color: #666666;">Si deseas recuperar tu cuenta, puedes obtener una nueva contraseña haciendo clic en el siguiente botón:</p>
                            </td>
                        </tr>
                        <!-- Button -->
                        <tr>
                            <td align="center">
                                <a href="${url}" style="display: inline-block; padding: 15px 25px; background-color: #000000; font-weight: 600;  color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 100px;">Cambiar Contraseña</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    
        <!-- Footer -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px; background-color: #f5f5f5; padding: 20px 0;border-radius: 20px 20px 0 0;">
            <tr>
                <td align="center">
                    <p style="margin: 0; padding: 0; font-size: 14px; color: #999999;">&copy; 2024 Arneby. All rights reserved.</p>
                    <p style="margin: 5px 0; padding: 0; font-size: 14px; color: #999999;">
                        <a href="https://arneby.com/login" style="color: #999999; text-decoration: none;">Login</a> | 
                        <a href="https://arneby.com/contact" style="color: #999999; text-decoration: none;">Contact Us</a> | 
                        <a href="https://arneby.com/terms" style="color: #999999; text-decoration: none;">Terms & Conditions</a> | 
                        <a href="https://arneby.com/legal" style="color: #999999; text-decoration: none;">Legal Notice</a>
                    </p>
                </td>
            </tr>
        </table>
    </body>
    `;
}