import { apiRequest } from "./queryClient";

// Define the supported programming languages
export type ProgrammingLanguage = 'python' | 'java' | 'cpp' | 'javascript';

// Define the supported models
export type ModelType = 'gemini-2.0-pro' | 'transformer' | 'codebert' | 'gpt-mini';

// Interface for code generation request
export interface CodeGenerationRequest {
  prompt: string;
  language: ProgrammingLanguage;
  model: ModelType;
}

// Interface for code generation response
export interface CodeGenerationResponse {
  code: string;
  language: ProgrammingLanguage;
  model: ModelType;
  executionTime?: number;
}

// Generate code from a natural language prompt
export async function generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
  try {
    const response = await apiRequest('POST', '/api/generate', request);
    return await response.json();
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}

// Simple estimate of token count - very rough approximation
export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  // Simple approximation: words + special tokens
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.round(words * 1.3);
}

// Example code templates for when the backend is not available
export const exampleCodeTemplates: Record<ProgrammingLanguage, (prompt: string) => string> = {
  python: (prompt: string) => {
    if (prompt.includes('fibonacci')) {
      return `def fibonacci(n):
    """
    Calculate the Fibonacci sequence up to n terms.
    
    Args:
        n (int): Number of terms to calculate
        
    Returns:
        list: Fibonacci sequence
    """
    fib_sequence = [0, 1]
    
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return fib_sequence
    
    for i in range(2, n):
        next_num = fib_sequence[i-1] + fib_sequence[i-2]
        fib_sequence.append(next_num)
        
    return fib_sequence

# Example usage
if __name__ == "__main__":
    n_terms = 10
    result = fibonacci(n_terms)
    print(f"Fibonacci sequence with {n_terms} terms: {result}")
`;
    }
    
    // Default Python function
    return `def calculate_stats(numbers):
    """
    Calculate the sum and average of a list of numbers.
    
    Args:
        numbers (list): A list of numeric values
        
    Returns:
        tuple: (sum, average) containing the sum and average of the input list
    """
    if not numbers:
        return 0, 0
        
    total = sum(numbers)
    average = total / len(numbers)
    
    return total, average

# Example usage
if __name__ == "__main__":
    sample_data = [10, 20, 30, 40, 50]
    sum_result, avg_result = calculate_stats(sample_data)
    print(f"Sum: {sum_result}")
    print(f"Average: {avg_result}")
`;
  },
  
  java: (prompt: string) => {
    if (prompt.includes('bank account')) {
      return `public class BankAccount {
    private String accountNumber;
    private String accountHolderName;
    private double balance;
    
    public BankAccount(String accountNumber, String accountHolderName) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = 0.0;
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit amount must be positive");
            return;
        }
        
        this.balance += amount;
        System.out.println("Deposited: $" + amount);
        System.out.println("New balance: $" + this.balance);
    }
    
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Withdrawal amount must be positive");
            return;
        }
        
        if (amount > this.balance) {
            System.out.println("Insufficient funds");
            return;
        }
        
        this.balance -= amount;
        System.out.println("Withdrew: $" + amount);
        System.out.println("New balance: $" + this.balance);
    }
    
    public double getBalance() {
        return this.balance;
    }
    
    public String getAccountInfo() {
        return "Account Number: " + this.accountNumber + 
               "\\nAccount Holder: " + this.accountHolderName + 
               "\\nCurrent Balance: $" + this.balance;
    }
    
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456789", "John Doe");
        account.deposit(1000.0);
        account.withdraw(250.0);
        System.out.println(account.getAccountInfo());
    }
}`;
    }
    
    // Default Java class
    return `public class MathUtils {
    /**
     * Calculates the sum and average of an array of numbers
     * 
     * @param numbers An array of double values
     * @return A double array where the first element is sum and second is average
     */
    public static double[] calculateStats(double[] numbers) {
        if (numbers == null || numbers.length == 0) {
            return new double[]{0, 0};
        }
        
        double sum = 0;
        for (double num : numbers) {
            sum += num;
        }
        
        double average = sum / numbers.length;
        
        return new double[]{sum, average};
    }
    
    public static void main(String[] args) {
        double[] data = {10.5, 20.5, 30.5, 40.5, 50.5};
        double[] results = calculateStats(data);
        
        System.out.println("Sum: " + results[0]);
        System.out.println("Average: " + results[1]);
    }
}`;
  },
  
  cpp: (prompt: string) => {
    if (prompt.includes('prime numbers')) {
      return `#include <iostream>
#include <vector>
#include <cmath>

/**
 * Check if a number is prime
 * 
 * @param num The number to check
 * @return true if prime, false otherwise
 */
bool isPrime(int num) {
    if (num <= 1) {
        return false;
    }
    
    // Check from 2 to sqrt(num)
    for (int i = 2; i <= sqrt(num); i++) {
        if (num % i == 0) {
            return false;
        }
    }
    
    return true;
}

/**
 * Find all prime numbers in a given range
 * 
 * @param start The start of the range
 * @param end The end of the range
 * @return A vector containing all prime numbers in the range
 */
std::vector<int> findPrimesInRange(int start, int end) {
    std::vector<int> primes;
    
    for (int i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push_back(i);
        }
    }
    
    return primes;
}

int main() {
    int start = 10;
    int end = 50;
    
    std::vector<int> primeNumbers = findPrimesInRange(start, end);
    
    std::cout << "Prime numbers between " << start << " and " << end << ":" << std::endl;
    
    for (int prime : primeNumbers) {
        std::cout << prime << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`;
    }
    
    // Default C++ program
    return `#include <iostream>
#include <vector>

/**
 * Calculate the sum and average of a vector of numbers
 * 
 * @param numbers A vector of double values
 * @return A pair containing the sum and average
 */
std::pair<double, double> calculateStats(const std::vector<double>& numbers) {
    if (numbers.empty()) {
        return {0, 0};
    }
    
    double sum = 0;
    for (const auto& num : numbers) {
        sum += num;
    }
    
    double average = sum / numbers.size();
    
    return {sum, average};
}

int main() {
    std::vector<double> data = {10.5, 20.5, 30.5, 40.5, 50.5};
    
    auto [sum, average] = calculateStats(data);
    
    std::cout << "Sum: " << sum << std::endl;
    std::cout << "Average: " << average << std::endl;
    
    return 0;
}`;
  },
  
  javascript: (prompt: string) => {
    return `/**
 * Calculate the sum and average of an array of numbers
 * 
 * @param {number[]} numbers - An array of numbers
 * @returns {Object} An object containing the sum and average
 */
function calculateStats(numbers) {
    if (!numbers || numbers.length === 0) {
        return { sum: 0, average: 0 };
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = sum / numbers.length;
    
    return { sum, average };
}

// Example usage
const data = [10, 20, 30, 40, 50];
const { sum, average } = calculateStats(data);

console.log(\`Sum: \${sum}\`);
console.log(\`Average: \${average}\`);
`;
  }
};
