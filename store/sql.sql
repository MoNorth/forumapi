select comment.comment_id,comment.comment_context,comment.comment_comment,comment.comment_date,comment.project_id,comment.login_id,login.login_name from comment left join login on (comment.login_id=login.login_id) where comment.project_id = 9 order by comment.comment_id desc;


select project.project_id,project.project_title,project.project_label,project.project_date,project.login_id,login.login_name,count(comment.project_id) as count from project left join login on (project.login_id=login.login_id) left join comment on (project.project_id=comment.project_id) group by project.project_id order by project.project_id desc;


select project.project_id,project.project_title,project.project_label,project.project_date,count(comment.project_id) as count from project left join comment on (project.project_id=comment.project_id) where project.login_id=1 group by project.project_id order by project.project_id desc


[comment.comment_id,comment.comment_context,comment.comment_comment,comment.comment_date,comment.project_id,comment.login_id,login.login_name]

select a.project_title, a.project_label from project a where (select count(*) from project where project_id=a.project_id)<2 order by project_label,project_id desc;

select project_label,count(*) as count from project group by project_label order by count(*) desc;


select project.project_id,project.project_title,project.project_label,project.project_date,project.login_id,login.login_name,count(comment.project_id) as count from project left join login on (project.login_id=login.login_id) left join comment on (project.project_id=comment.project_id) where project.project_label="11" group by project.project_id order by count desc limit 5;