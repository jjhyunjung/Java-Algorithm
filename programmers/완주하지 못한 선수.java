import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";
        
        HashMap<String, Integer> map = new HashMap<>();
        
        for(String name : participant)
            map.put(name, map.getOrDefault(name, 0) + 1);
        
        // 완주한 사람들은 value를 하나씩 뺀다 
        // 즉, 남아있는 한 사람이 완주하지 못한 사람
        for(String name : completion)
            map.put(name, map.get(name) - 1);
        
        // value가 0이 아닌 참가자 찾기
        // keySet() : HashMap이 들고 있는 전체 key의 배열을 반환
        for(String key : map.keySet()) {
        	//.get(key) : key에 해당하는 value를 반환
            if(map.get(key) > 0) {
                answer = key;
                break;
            }
        }
        
        return answer;
    }
}
