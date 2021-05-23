<?php
include 'inc/header.php';
include 'classes/database.php';
Session::CheckSession();
$sId =  Session::get('roleid');
$DB = new gen_id();
$uid = $DB->generate_id(20);
if ($sId === '1') { ?>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['addUser'])) {

  $userAdd = $users->addNewUserByAdmin($_POST, $uid);
}

if (isset($userAdd)) {
  echo $userAdd;
}


 ?>


 <div class="card ">
   <div class="card-header">
          <h3 class='text-center'>Add New User</h3>
        </div>
        <div class="cad-body">



            <div style="width:600px; margin:0px auto">

            <form class="" action="" method="post">
               
            <div class="form-group">
                  <label for="userid">User ID</label>
                  <input type="text" name="userid" value = "<?php echo $uid; ?>" disabled  class="form-control">
                </div>

                <div class="form-group">
                  <label for="username">Your username</label>
                  <input type="text" name="username"  class="form-control">
                </div>

                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" name="email"  class="form-control">
                </div>

                 <div class="form-group">
                  <div class="form-group">
                    <label for="gender">Select Gender</label>
                    <select class="form-control" name="gender" id="gender">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" name="password" class="form-control">
                </div>

                <div class="form-group">
                  <div class="form-group">
                    <label for="sel1">Select user Role</label>
                    <select class="form-control" name="roleid" id="roleid">
                      <option value="1">Admin</option>
                      <option value="2">Editor</option>
                      <option value="3">User only</option>
                    </select>
                  </div>
                </div>


                <div class="form-group">
                  <button type="submit" name="addUser" class="btn btn-success">Register</button>
                </div>


            </form>
          </div>


        </div>
      </div>

<?php
}else{

  header('Location:index.php');



}
 ?>

  <?php
  include 'inc/footer.php';

  ?>
