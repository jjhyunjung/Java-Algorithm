import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	private static final BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	static int[][] arr;
	static boolean[] visited;
	static StringBuilder sb = new StringBuilder();
	
	public static void main(String[] args) throws IOException {
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int n = Integer.parseInt(st.nextToken()); // 정점의 개수
		int m = Integer.parseInt(st.nextToken()); // 간선의 개수
		int v = Integer.parseInt(st.nextToken()); // 탐색을 시작할 정점의 번호
		
		arr = new int[n+1][n+1]; // index는 0부터 시작하기 때문에 1을 더함
		visited = new boolean[n+1];
		
		// 노드와 간선에 대한 값 초기화
		for(int i = 0; i < m; i++) {
			st = new StringTokenizer(br.readLine());
			int s = Integer.parseInt(st.nextToken());
			int e = Integer.parseInt(st.nextToken());
			arr[s][e] = 1;
			arr[e][s] = 1;
		}
		
		dfs(v);
		sb.append("\n"); // 개행
		bfs(v);
		
		System.out.println(sb);
	}
	
	// visited 배열 false로 초기화
	public static void initVisited() {
		for(int i = 0; i < visited.length; i++) visited[i] = false;
	}
	
	// dfs
	public static void dfs(int start) {
		//경로 출력
		sb.append(start + " ");
		//현재 노드 방문 처리
		visited[start] = true;
		
		for(int i = 1; i < visited.length; i++)
			// 현재 노트와 다른 노드 중 미방문 and 간선 존재
			if(i != start && visited[i] == false && arr[start][i] == 1)
				dfs(i);
	}
	
	
	// bfs: 큐 이용
	public static void bfs(int start) {
		// visited 배열 초기화
		initVisited();
		// 큐 구현
		Queue<Integer> queue = new LinkedList<>();
			queue.add(start);
			
			// 현재 노드를 방문 처리
			visited[start] = true;
		
			// 큐가 빌때까지 반복
			while(!queue.isEmpty()) {
				// 큐에서 하나의 원소를 뽑아서 출력
				int num = queue.poll();
				sb.append(num + " ");
				
				// 인접한 노드 중 아직 방문하지 않은 원소들을 큐에 삽입
				for(int i = 1; i < visited.length; i++) {
					//현재 노드와 다른 노드 중 미방문 and 간선 존재
					if(i != num && visited[i] == false && arr[num][i] == 1) {
						queue.add(i);
						visited[i] = true;
					}
				}
			}
			sb.append("\n");
	}
}
