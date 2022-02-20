import java.util.*;

class Solution {
    public int[] solution(int[] answers) {
        int[] p1 = {1,2,3,4,5};
        int[] p2 = {2,1,2,3,2,4,2,5};
        int[] p3 = {3,3,1,1,2,2,3,3,4,4,5,5};
        int[] correct = new int[3]; //학생 3명 
        
        //정답과 비교하여 답이 같으면 correct++
        for(int i = 0; i < answers.length; i++) {
            if(answers[i]==p1[i%5]) {
                correct[0]++;
            }
            if(answers[i]==p2[i%p2.length]) {
                correct[1]++;   
            }
            if(answers[i]==p3[i%p3.length]) {
                correct[2]++;
            }
        }
        
        //가장 높은 점수 찾기
        int highest = correct[0];
        for(int i = 0; i < correct.length; i++) {
            if(highest < correct[i]) {
                highest = correct[i];
            }
        }
        
        //가장 높은 점수를 받은 사람 찾기
        ArrayList<Integer> list = new ArrayList<Integer>();
            
            for(int i = 0; i<correct.length; i++) {
                if(highest == correct[i]) {
                    list.add(i);
                }
            }
            
        int[] answer = {};
        answer = new int[list.size()];
        
        for(int i = 0; i<list.size(); i++) {
            answer[i] = list.get(i)+1; 
            //index: 0부터 시작하기때문에 1씩 더해줌
        }
                
        return answer;
    }
}
