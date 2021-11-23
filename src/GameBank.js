"use strict";

var GameBank = GameBank || {};


/** All money units are in Cents **/
GameBank._balance = 1000 * 100;
GameBank._balanceInGame = 0;

GameBank._winAmount = 0;
GameBank._winAmountTier = 0;

GameBank._currency = "USD";
GameBank._currencyPrefixStr = "$";

GameBank.SetBalance = function(v)
{
    GameBank._balance = v;
};

GameBank.GetBalance = function()
{
	return GameBank._balance;
};

GameBank.SetBalanceInGame = function(v)
{
    GameBank._balanceInGame = v;
};

GameBank.GetBalanceInGame = function()
{
	return GameBank._balanceInGame;
};

GameBank.SetWinAmount = function(v)
{
    GameBank._winAmount = v;
};

GameBank.GetWinAmount = function()
{
	return GameBank._winAmount;
};

GameBank.SetWinAmountTier = function(v)
{
    GameBank._winAmountTier = v;
};

GameBank.GetWinAmountTier = function()
{
	return GameBank._winAmountTier;
};

GameBank.SetCurrency = function(v)
{
	GameBank._currency = v;
};

GameBank.GetCurrency = function()
{
	return GameBank._currency;
};

GameBank.SetCurrencyPrefixStr = function(v)
{
	GameBank._currencyPrefixStr = v;
};

GameBank.GetCurrencyPrefixStr = function()
{
	return GameBank._currencyPrefixStr;
};