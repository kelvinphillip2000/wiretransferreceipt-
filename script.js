document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const printBtn = document.getElementById('printReceiptBtn');
    const receiptContainer = document.getElementById('receiptContainer');
    
    // Generate random transaction ID
    function generateTransactionId() {
        const prefix = 'WT';
        const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
        return `${prefix}${randomNum}`;
    }
    
    // Generate SWIFT/BIC code
    function generateSwiftCode() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        // Bank code (4 letters)
        for (let i = 0; i < 4; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        // Country code (2 letters)
        code += letters.charAt(Math.floor(Math.random() * letters.length));
        code += letters.charAt(Math.floor(Math.random() * letters.length));
        // Location code (2 letters/digits)
        code += Math.random() > 0.5 ? 
            letters.charAt(Math.floor(Math.random() * letters.length)) : 
            Math.floor(Math.random() * 10);
        code += Math.random() > 0.5 ? 
            letters.charAt(Math.floor(Math.random() * letters.length)) : 
            Math.floor(Math.random() * 10);
        // Branch code (3 letters/digits, optional)
        if (Math.random() > 0.3) {
            code += 'XXX';
        }
        return code;
    }
    
    // Generate receipt number
    function generateReceiptNumber() {
        return 'RC-' + Math.floor(100000 + Math.random() * 900000);
    }
    
    // Format date
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Format currency
    function formatCurrency(amount, currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
    
    // Generate receipt
    generateBtn.addEventListener('click', function() {
        // Get form values with fallbacks
        const senderName = document.getElementById('senderName').value || 'John Doe';
        const senderAccount = document.getElementById('senderAccount').value || '••••••••';
        const senderRouting = document.getElementById('senderRouting').value || '•••••••';
        const senderBank = document.getElementById('senderBank').value || 'National Bank';
        
        const recipientName = document.getElementById('recipientName').value || 'Jane Smith';
        const recipientAccount = document.getElementById('recipientAccount').value || '••••••••';
        const recipientRouting = document.getElementById('recipientRouting').value || '•••••••';
        const recipientBank = document.getElementById('recipientBank').value || 'International Bank';
        const recipientBankAddress = document.getElementById('recipientBankAddress').value || 'Not specified';
        
        const amount = parseFloat(document.getElementById('amount').value) || 0;
        const currency = document.getElementById('currency').value || 'USD';
        const reference = document.getElementById('reference').value || 'No reference provided';
        
        // Set receipt values
        document.getElementById('receiptNumber').textContent = generateReceiptNumber();
        document.getElementById('receiptDate').textContent = formatDate(new Date());
        
        // Sender info
        document.getElementById('receiptSenderName').textContent = senderName;
        document.getElementById('receiptSenderAccount').textContent = senderAccount.replace(/./g, (char, i) => i < 4 ? char : '•');
        document.getElementById('receiptSenderRouting').textContent = senderRouting.replace(/./g, (char, i) => i < 2 ? char : '•');
        document.getElementById('receiptSenderBank').textContent = senderBank;
        
        // Recipient info
        document.getElementById('receiptRecipientName').textContent = recipientName;
        document.getElementById('receiptRecipientAccount').textContent = recipientAccount.replace(/./g, (char, i) => i < 4 ? char : '•');
        document.getElementById('receiptRecipientRouting').textContent = recipientRouting.replace(/./g, (char, i) => i < 2 ? char : '•');
        document.getElementById('receiptRecipientBank').textContent = recipientBank;
        document.getElementById('receiptRecipientBankAddress').textContent = recipientBankAddress;
        
        // Transfer details
        document.getElementById('receiptAmount').textContent = formatCurrency(amount, currency);
        document.getElementById('receiptReference').textContent = reference;
        document.getElementById('receiptTransactionId').textContent = generateTransactionId();
        document.getElementById('receiptSwiftCode').textContent = generateSwiftCode();
        
        // Show receipt
        receiptContainer.classList.remove('hidden');
        receiptContainer.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Reset form
    resetBtn.addEventListener('click', function() {
        document.getElementById('receiptForm').reset();
        receiptContainer.classList.add('hidden');
    });
    
    // Print receipt
    printBtn.addEventListener('click', function() {
        window.print();
    });
});
