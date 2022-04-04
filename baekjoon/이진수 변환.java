import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class Main {
	static public StringBuilder sb = new StringBuilder();
	
	public static void main(String[] args) throws IOException {
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		
		long N = Long.parseLong(br.readLine());

		// 10진법에서 2진법
		binary(N);
		
		// StringBuilder에 모아둔 숫자 뒤집어주기
		bw.write(String.valueOf(sb.reverse()));
		bw.flush();
		bw.close();
		
	}
	
	static long binary(long N) {
		long remainder = 0;
		if(N >= 2) {
			remainder = N % 2;
			sb.append(remainder);
			return binary(N/2);
		} else {
			remainder = N % 2;
			sb.append(remainder);
			return N;
		}
	}
}
