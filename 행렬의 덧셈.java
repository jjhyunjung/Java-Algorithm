class Solution {
	public int[][] solution(int[][] arr1, int[][] arr2) {

		int[][] arr = new int[arr1.length][arr1[0].length];
		for (int i = 0; i < arr1.length; i++) {
			for (int j = 0; j < arr1[0].length; j++) {
				arr[i][j] = arr1[i][j] + arr2[i][j];
			}
		}
		return arr;
	
	}
}

//2차원 배열의 length는 1차원 배열과 다름
//배열변수.length : 행의 개수
//배열변수[인덱스].length : 각 행이 가지고 있는 열의 개수
