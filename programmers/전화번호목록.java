import java.util.HashMap;
import java.util.Map;

class Solution {
    public boolean solution(String[] phone_book) {
        Map<String, Integer> map = new HashMap<>();
        
        // 전화번호를 HashMap에 입력
        for (int i = 0; i < phone_book.length; i++)
            map.put(phone_book[i], i);
        
        for(int i = 0; i < phone_book.length; i++) //배열의 크기 = 3번 돌아라
            for(int j = 0; j < phone_book[i].length(); j++) //전화번호 숫자만큼 돌아라
                if(map.containsKey(phone_book[i].substring(0, j)))
                    return false;

            return true;
    }
}
