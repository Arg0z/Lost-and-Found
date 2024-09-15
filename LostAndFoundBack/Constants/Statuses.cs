namespace LostAndFoundBack.Constants
{
    // Enum representing the status of an item
    public enum ItemStatuses
    {
        // The item has not been claimed by anyone yet
        Unclaimed,

        // The item has been claimed by someone
        Claimed,

        // The status of the item is pending some action or decision
        Pending
    }

    // Enum representing the status of a claim
    public enum ClaimStatuses
    {
        // A new claim has been created
        New,

        // The claim has been approved
        Approved,

        // The claim has been rejected
        Rejected,

        // The status of the claim is pending some action or decision
        Pending
    }

    // Enum representing the status of a reported item
    public enum ReportedItemStatuses
    {
        // The reported item has been approved
        Approved,

        // A new report for the item has been created
        New,

        // The status of the reported item is pending some action or decision
        Pending,

        // The reported item has been rejected
        Rejected
    }
}
