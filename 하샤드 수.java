class Solution {
	public boolean solution(int x) {
		boolean answer = true;

		int num = x;
		int sum = 0;

		while (num != 0) {
			sum += num % 10;
			num = num / 10;
		}

		if (x % sum != 0) {
			return false;
		}

		return answer;
	}
}
