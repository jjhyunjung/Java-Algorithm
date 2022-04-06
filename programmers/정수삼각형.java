class Solution {
    public int solution(int[][] triangle) {
        int[][] sum = new int[triangle.length][triangle.length];
        
        sum[0][0] = triangle[0][0]; //맨 꼭대기 값
        
        for(int i = 1; i < triangle.length; i++) {
            sum[i][0] = sum[i-1][0] + triangle[i][0]; // 왼쪽 끝값
            sum[i][i] = sum[i-1][i-1] + triangle[i][i]; // 오른쪽 끝값
        }
        
        for(int i = 2; i<triangle.length; i++) {
            for(int j = 1; j < i; j++) {
                // 구하고자하는 위치의 왼쪽과 오른쪽 중 큰 값과의 합 구하기
                sum[i][j] = Math.max(sum[i-1][j-1], sum[i-1][j]) + triangle[i][j];
            }
        }
        
        // 마지막 줄에서 가장 큰 값 찾기
        int largest = sum[sum.length - 1][0];
        for(int i = 1; i < triangle.length; i++) {
            int lastRowNo = sum[sum.length - 1][i];
            if (largest < lastRowNo) {
                largest = lastRowNo;      
            }
        }
        return largest;
    }
}
