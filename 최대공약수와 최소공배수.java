class Solution {
	public int[] solution(int n, int m) {
		int[] answer = new int[2];
		int a = Math.max(n, m);
		int b = Math.min(n, m);

		while (b != 0) {
			int r = a % b;
			a = b;
			b = r;
		}

		return new int[] { a, n * m / a };
	}
}

// 1. 최대공약수: 유클리드 호제법 이용
// 임의의 두 자연수 a, b (a > b)가 주어짐
// a를 b로 나눈 나머지 r로 가정 (r = a % b)
// a = b가 되고, b = r이 된다
// 이때 b가 0이 될 때의 a가 최대공약수

// 2. 최소공배수 = a * b / 최대공약수
