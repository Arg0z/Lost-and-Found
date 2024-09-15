using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using SendGrid.Helpers.Mail;
using SendGrid;

// EmailService class responsible for sending emails using the SendGrid service
public class EmailService
{
    // IConfiguration object to access application settings, including SendGrid API key
    private readonly IConfiguration _configuration;

    // Constructor to initialize the EmailService with configuration settings
    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // Method to send an email asynchronously using SendGrid
    public async Task SendEmailAsync(string recipientEmail, string subject, string message)
    {
        // Retrieve SendGrid settings from the configuration (appsettings.json or environment variables)
        var sendGridSettings = _configuration.GetSection("SendGridSettings");

        // Get the SendGrid API key from the configuration
        var apiKey = _configuration["SendGridApiKey"];//this is depricated. Please change key to your own

        // Create a new SendGrid client using the API key
        var client = new SendGridClient(apiKey);

        // Set up the sender's email and name from configuration
        var from = new EmailAddress(sendGridSettings["SenderEmail"], sendGridSettings["SenderName"]);

        // Set up the recipient's email
        var to = new EmailAddress(recipientEmail);

        // Create the email message object with subject, plain text, and HTML content
        var msg = MailHelper.CreateSingleEmail(from, to, subject, message, message);

        // Send the email asynchronously
        var response = await client.SendEmailAsync(msg);

        // Check if the response status code indicates failure
        if (response.StatusCode != System.Net.HttpStatusCode.OK)
        {
            // Handle errors (e.g., log the error or throw an exception)
        }
    }
}
