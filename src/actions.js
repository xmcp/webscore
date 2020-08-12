import {get_score, LoginRequiredError} from './scores_api';
import {check_score} from './score_parser';
import {shown_score_helper} from './shown_score_helper';

//import fake_score from './fake_score';

export function do_init() {
    return (dispatch)=>{
        if(localStorage['TOKEN'])
            dispatch({
                type: 'init_ok',
                user_token: localStorage['TOKEN'],
            });
        else
            dispatch({
                type: 'login_required',
            });
    };
}

export function do_load(is_auto=false) {
    return (dispatch,getState)=>{
        let {user_token}=getState();
        if(user_token) {
            dispatch({
                type: 'load_begin',
            });
            get_score(user_token,is_auto)
                .then((res)=>{
                    dispatch({
                        type: 'load_done',
                        data: res,
                        is_auto: is_auto,
                        timestamp: +new Date(),
                    })
                })
                .catch((err)=>{
                    if(err===LoginRequiredError)
                        dispatch({
                            type: 'login_required',
                        });
                    else
                        dispatch({
                            type: 'load_error',
                            error: ''+err,
                        });
                });
        } else {
            dispatch({
                type: 'login_required',
            })
        }
    };
}

export function toggle_switch(name) {
    return {
        type: 'toggle_switch',
        name: name,
    }
}

export function tamper_score(idx,score) {
    return (dispatch,getState)=>{
        score=score.trim().toUpperCase();

        if(score==='IF YOU CAN') { // unread
            let course_id=getState().data.courses[idx].course_id;
            let shown_scores=shown_score_helper.get();
            shown_score_helper.set(shown_scores.filter((cid)=>cid!==course_id));
            shown_score_helper.apply();

            let next=do_load();
            next(dispatch,getState);
            return;
        }

        if(score.length>4)
            return;

        if(!check_score(score))
            return;

        dispatch({
            type: 'tamper_score',
            idx: idx,
            score: isNaN(score) ? score : parseFloat(score),
        });
    };
}

export function untamper_score(idx) {
    return {
        type: 'untamper_score',
        idx: idx===undefined ? null : idx,
    }
}

export function read_all() {
    return (dispatch)=>{
        shown_score_helper.apply();
        return dispatch({
            type: 'read_all',
        });
    };
}