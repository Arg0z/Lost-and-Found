using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

using SendGrid.Helpers.Mail;
using SendGrid;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string recipientEmail, string subject, string message)
    {
        var sendGridSettings = _configuration.GetSection("SendGridSettings");
        var apiKey = _configuration["SendGridApiKey"];
        var client = new SendGridClient(apiKey);

        var from = new EmailAddress(sendGridSettings["SenderEmail"], sendGridSettings["SenderName"]);
        var to = new EmailAddress(recipientEmail);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, message, message);

        var response = await client.SendEmailAsync(msg);

        
        if (response.StatusCode != System.Net.HttpStatusCode.OK)
        {
            // Handle errors
        }
    }
}
