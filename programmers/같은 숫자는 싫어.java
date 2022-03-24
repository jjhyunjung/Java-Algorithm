import java.util.ArrayList;

public class Solution {
	public int[] solution(int[] arr) {
		int[] answer = {};

		ArrayList<Integer> list = new ArrayList<Integer>();
		int number = 10;
		for (int i = 0; i < arr.length; i++) {
			if (arr[i] != number) {
				list.add(arr[i]);
				number = arr[i];
			}
		}

		answer = new int[list.size()];
		for (int i = 0; i < list.size(); i++) {
			answer[i] = list.get(i);
		}
		return answer;
	}
}

// 기준점을 잡고 같은 숫자는 지나치고 다른 게 나올 때마다 저장
// 1. 저장되는 데이터의 순서 유지 + 배열의 길이 모름 -> ArrayList 사용
// 2. int number = 10; 원소가 0~9이기때문에 영향 안 받는 숫자를 초기값으로 대입
// 3. arr[i]를 num에 적용하여 num과 비교 후 숫자가 다른 경우에만 list에 값 삽입
// 4. 가변 리스트를 일반 배열로 바꾸는 작업 실행
