import java.util.*;

class Solution {
	public int solution(int[] d, int budget) {
		int dept = 0;
		Arrays.sort(d);

		for (int i = 0; i < d.length; i++) {
			if (budget == 0 || budget < d[i]) {
				break;
			}
			budget -= d[i];
			dept++;
		}
		return dept;
	}
}
