class Solution {
	public int[] solution(long n) {
		// String 타입으로 변환
		String strn = String.valueOf(n);

		// reverse 메소드를 사용하기 위해 StringBuilder 인스턴스를 생성
		StringBuilder sb = new StringBuilder(strn);
		sb = sb.reverse();

		// 한글자씩 잘라서 stringArr 배열에 담는 작업
		String[] stringArr = sb.toString().split("");

		// 문자열 길이만큼 배열 길이 할당
		int[] answer = new int[sb.length()];

		// String타입을 int타입으로 변환 후 answer[i] 배열에 담음
		for (int i = 0; i < sb.length(); i++) {
			answer[i] = Integer.parseInt(stringArr[i]);
		}

		return answer;
	}
}
