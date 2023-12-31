# zkCheck
#### Powered by Aleo blockchain

### <ins>Demo</ins>:
https://zkcheck.github.io

### <ins>Video</ins>:
<a href="https://www.youtube.com/watch?v=LqUDeSF3LmQ" target="_blank"><img src="http://img.youtube.com/vi/LqUDeSF3LmQ/0.jpg"
alt="zkKYC Youtube Video" width="360" height="280" border="10" /></a>

### <ins>Description</ins>:
zkCheck - KYC platform using zkML (Zero-knowledge Machine Learning) algorithms on Aleo blockchain.

### <ins>zkKYC privacy and usability motivation</ins>:
Due to AML/CTF regulations, customer’s privacy is typically traded off for the mandated transparency requirements.
In addition, this privacy erosion also reduces the security and safety of the customer as shared personal information can be passed on or stolen and used against the best interest of the customer.
Recent innovations in self-sovereign identity and zero-knowledge cryptography, along with proper ecosystem design, allow for a novel approach to KYC that protects the customer’s privacy without reducing transparency.
The proposed solution concept, zkKYC, removes the need for the customer to share any personal information with a regulated business for the purpose of KYC, and yet provides the transparency to allow for a customer to be identified.

### <ins>Overview</ins>:

#### Decision Tree using Leo Language
Code [main.leo](leo-smart-contracts%2Fsrc%2Fmain.leo) was auto generated from trained model(DecisionTreeClassifier) using our DT-translator: [dt_to_leo_code.py](dt-generator%2Fdt_to_leo_code.py)

To compile this Aleo program, run:
```bash
cd leo-smart-contracts
leo build
```
Test input from [zkcheck_kyc.in](leo-smart-contracts%2Finputs%2Fzkcheck_kyc.in):
```bash
leo run
```
The result will be ```0u32``` if KYC failed, or ```1u32``` which means KYC was passed successfully.

#### Build synthetic dataset, train Decision Tree model 
Given the limits and sensitivity of the data, it was decided to make a synthetic dataset for demonstration purposes.
This [zkML-DT-research.ipynb](zkML-DT-research.ipynb) contains dataset creation, model training and converting it to Leo Language.

#### Testnet interaction
Program was deployed to Testnet3: [zkcheck_kyc.aleo](https://explorer.hamp.app/program?id=zkcheck_kyc.aleo)

It's possible to interact with deployed program using [our website](https://zkcheck.github.io) or build frontend locally:
```bash
cd zkkyc-frontend
yarn
yarn start
```
