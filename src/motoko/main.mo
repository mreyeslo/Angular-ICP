import Array "mo:base/Array";
import Debug "mo:base/Debug";
import IC "mo:base/ExperimentalInternetComputer";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Map "./src/Map";
import Prim "mo:prim";
import Set "./src/Set";
import { ihash; nhash; n32hash; n64hash; thash; phash; bhash; lhash } "./src/Map";

actor main {
  stable var websiteTemplates = Map.new<Text, Text>();
  stable var organization = Map.new<Text, Text>();
  stable var emails = Map.new<Text, Text>();
  stable var wallets = Map.new<Text, Text>();
  stable var admin = Map.new<Text, Text>();

  // public query func getData() : async [(Text, Text)] {
  //   return Map.toArray(wallets);
  // };

  public func addData(key : Text, value : Text) {
    var z = Map.set(emails, thash, key, value);
  };

  // public shared ({ caller }) func ledger_transfer_icp(
  //   icp_amount : Nat
  // ) : async TransferResult {
  //   var amount = Nat64.fromNat(icp_amount);
  //   var res : TransferResult = #Err(#TxCreatedInFuture);
  //   // let to_ai = Account.principalToSubaccount(Principal.fromText(Const.canister_project_cycles_wallet));
  //   let to_ = Account.accountIdentifier(
  //     Principal.fromText("3sq5w-t7zis-qf3wl-vgvih-byre2-ttswt-vzupn-6mnpw-mju7l-jhbfi-hae"),
  //     Account.defaultSubaccount(),
  //   );
  //   try {
  //     res := await public_ledger.transfer({
  //       to = to_;
  //       fee = { e8s = 10_000 };
  //       memo = 0;
  //       from_subaccount = null;
  //       created_at_time = null;
  //       amount = { e8s = amount - 10_000 };
  //     });
  //     return res;
  //   } catch (e) {};
  //   return res;
  // };
};
