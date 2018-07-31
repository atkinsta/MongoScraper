$(document).ready(() => {
    $(document).on("click keyUp", ".submitComment", function(event) {
        event.preventDefault();
        const postId = $(this).attr("data-id");
        console.log(postId);
        const content = $("#comment-" + postId).val();
        console.log(content);
        $.post("/api/note/" + postId, data = {
            content: content
        }).then((data) => {
            $("comment-"+ postId).empty();
            location.reload();
        });
    });

    $(document).on("click", ".deleteComment", function() {
        const commentId = $(this).attr("data-id");
        $.ajax({
            url: "/api/delete/" + commentId,
            method: "DELETE"
        }).then(() => {
            location.reload();
        });
    });
});